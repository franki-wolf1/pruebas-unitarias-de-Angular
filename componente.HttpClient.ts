//Componente que utiliza el servicio HttpClient
// componente.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html'
})
export class ComponenteComponent {
  datos: any;

  constructor(private http: HttpClient) { }

  obtenerDatos() {
    this.http.get('https://api.example.com/datos')
      .subscribe(datos => this.datos = datos);
  }
}

// componente.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponenteComponent } from './componente.component';

describe('ComponenteComponent', () => {
  let component: ComponenteComponent;
  let fixture: ComponentFixture<ComponenteComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ComponenteComponent]
    });

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ComponenteComponent);
    component = fixture.componentInstance;
  });

  it('should fetch data correctly', () => {
    const mockData = [{ id: 1, name: 'Test' }];

    component.obtenerDatos();

    const req = httpMock.expectOne('https://api.example.com/datos');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    expect(component.datos).toEqual(mockData);
  });
});
