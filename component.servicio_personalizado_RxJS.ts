//Componente que utiliza un servicio personalizado con RxJS:
// servicio.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private contador$ = new BehaviorSubject<number>(0);

  getContador(): Observable<number> {
    return this.contador$.asObservable();
  }

  incrementarContador() {
    const nuevoValor = this.contador$.getValue() + 1;
    this.contador$.next(nuevoValor);
  }
}

// componente.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicioService } from './servicio.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html'
})
export class ComponenteComponent implements OnInit, OnDestroy {
  contador: number;
  subscription: Subscription;

  constructor(private servicioService: ServicioService) { }

  ngOnInit() {
    this.subscription = this.servicioService.getContador().subscribe(valor => {
      this.contador = valor;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  incrementarContador() {
    this.servicioService.incrementarContador();
  }
}

// componente.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponenteComponent } from './componente.component';
import { ServicioService } from './servicio.service';
import { BehaviorSubject } from 'rxjs';

describe('ComponenteComponent', () => {
  let component: ComponenteComponent;
  let fixture: ComponentFixture<ComponenteComponent>;
  let servicioServiceSpy: jasmine.SpyObj<ServicioService>;
  let contadorSubject: BehaviorSubject<number>;

  beforeEach(() => {
    contadorSubject = new BehaviorSubject<number>(0);
    const spy = jasmine.createSpyObj('ServicioService', ['getContador', 'incrementarContador'], {
      getContador: contadorSubject.asObservable()
    });

    TestBed.configureTestingModule({
      declarations: [ComponenteComponent],
      providers: [
        { provide: ServicioService, useValue: spy }
      ]
    });

    servicioServiceSpy = TestBed.inject(ServicioService) as jasmine.SpyObj<ServicioService>;
    fixture = TestBed.createComponent(ComponenteComponent);
    component = fixture.componentInstance;
  });

  it('should increment counter correctly', () => {
    component.ngOnInit();
    expect(component.contador).toBe(0);

    servicioServiceSpy.incrementarContador.and.callFake(() => {
      contadorSubject.next(contadorSubject.getValue() + 1);
    });

    component.incrementarContador();
    expect(component.contador).toBe(1);

    component.ngOnDestroy();
  });
});
