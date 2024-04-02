//Componente que utiliza un servicio de Azure Cognitive Services:
// servicio.service.ts
import { Injectable } from '@angular/core';
import * as msalVision from '@azure/cognitiveservices-vision-computervision';
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private computerVisionClient: ComputerVisionClient;

  constructor() {
    this.computerVisionClient = new ComputerVisionClient(
      new msalVision.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': 'your-key' } }),
      'https://your-endpoint.cognitiveservices.azure.com'
    );
  }

  async analizarImagen(imagen: File): Promise<msalVision.ComputerVisionResponse> {
    const result = await this.computerVisionClient.analyzeImage(imagen);
    return result;
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
  resultadoAnalisis: any;

  constructor(private servicioService: ServicioService) { }

  analizarImagen(imagen: File) {
    this.servicioService.analizarImagen(imagen)
      .then(resultado => this.resultadoAnalisis = resultado)
      .catch(error => console.error(error));
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
    const spy = jasmine.createSpyObj('ServicioService', ['analizarImagen']);

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

  it('should analyze image correctly', () => {
    const mockImagen = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const mockResultado = { description: 'Test image' };

    servicioServiceSpy.analizarImagen.and.resolveTo(mockResultado);

    component.analizarImagen(mockImagen);

    expect(servicioServiceSpy.analizarImagen).toHaveBeenCalledWith(mockImagen);
    expect(component.resultadoAnalisis).toEqual(mockResultado);
  });
});
