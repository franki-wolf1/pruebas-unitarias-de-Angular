//Componente que utiliza el Router de Angular:
// componente.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html'
})
export class ComponenteComponent {
  constructor(private router: Router) { }

  irAOtraPagina() {
    this.router.navigate(['/otra-pagina']);
  }
}

// componente.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponenteComponent } from './componente.component';
import { Router } from '@angular/router';

describe('ComponenteComponent', () => {
  let component: ComponenteComponent;
  let fixture: ComponentFixture<ComponenteComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ComponenteComponent]
    });

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ComponenteComponent);
    component = fixture.componentInstance;
  });

  it('should navigate to another page', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.irAOtraPagina();

    expect(navigateSpy).toHaveBeenCalledWith(['/otra-pagina']);
  });
});
