import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegistrarComponent } from './registrar.component';
import { DebugElement } from '@angular/core';
import { HttpClientModule  } from '@angular/common/http';

describe('RegistrarComponent', () => {
  let component: RegistrarComponent;
  let fixture: ComponentFixture<RegistrarComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegistrarComponent,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar con el campo nombre vacío', () => {
    const nombreControl = component.formulario.get('nombre');
    expect(nombreControl?.value).toBe('');
  });

  it('debería marcar error si nombre tiene mas de 15 caracteres', () => {
    const nombreControl = component.formulario.get('nombre');
    nombreControl?.setValue('abcdefghijklmnop');
    expect(nombreControl?.valid).toBeFalse();
    expect(nombreControl?.errors?.['maxlength']).toBeTruthy();
  });

  it('debería ser válido con un nombre alfanumérico', () => {
    const nombreControl = component.formulario.get('nombre');
    nombreControl?.setValue('Juan123');
    expect(nombreControl?.valid).toBeTrue();
  });
});
