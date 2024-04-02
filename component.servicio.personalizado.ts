//Componente que utiliza un servicio personalizado:
// servicio.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  calcularTotal(numeros: number[]): number {
    return numeros.reduce((total, num) => total + num, 0);
  }
}

// componente.component.ts
import { Component } from '@angular/core';
import { ServicioService } from './servicio.service';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html'
})
export class ComponenteComponent {
  total: number;

  constructor(private servicioService: ServicioService) { }

  calcularTotal(numeros: number[]) {
    this.total = this.servicioService.calcularTotal(numeros);
  }
}

// componente.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponenteComponent } from './componente.component';
import { ServicioService } from './servicio.service';

describe('ComponenteComponent', () => {
  let component: ComponenteComponent;
  let fixture: ComponentFixture<ComponenteComponent>;
  let servicioServiceSpy: jasmine.SpyObj<ServicioService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ServicioService', ['calcularTotal']);

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

  it('should calculate total correctly', () => {
    const mockNumeros = [1, 2, 3];
    const mockTotal = 6;

    servicioServiceSpy.calcularTotal.and.returnValue(mockTotal);

    component.calcularTotal(mockNumeros);

    expect(servicioServiceSpy.calcularTotal).toHaveBeenCalledWith(mockNumeros);
    expect(component.total).toBe(mockTotal);
  });
});
