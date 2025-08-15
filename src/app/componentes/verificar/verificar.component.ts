import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule  } from '@angular/forms';
import { DesencriptarService } from '../../services/desencriptar.service';

/**
 * Componente para verificar y desencriptar una cadena.
 * 
 * Ingresar una cadena encriptada y la desencripta utilizando un servicio.
 */
@Component({
  selector: 'app-verificar',
  imports: [CommonModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './verificar.component.html',
  styleUrl: './verificar.component.css'
})
export class VerificarComponent {
  /** Formulario para la verificación */
  verificar!: FormGroup;
  /** Cadena ingresada por el usuario */
  cadena!:string;
  /** Mostrar un mensaje de error */
  showMsg: boolean = false;  
  /** Mensaje de error a mostrar */
  mensaje: string = '';
  /** Mostrar el resultado desencriptado */
  showDesencriptado: boolean = false;  
  /** Mensaje que contiene el resultado desencriptado */
  msgDesencriptado: string = '';

  /**
   * Crea una instancia de VerificarComponent.
   * 
   * @param fb - FormBuilder para crear formularios
   * @param desencriptarService - Servicio para desencriptar cadenas
   */
  constructor(private fb:FormBuilder, private desencriptarService: DesencriptarService){
    this.iniciar();
  }

  /**
   * Inicializa el formulario
   */
  iniciar(){
    this.verificar = this.fb.group({
      cadena: ['', [Validators.required]]
    });
  }

  /**
   * Verifica la cadena ingresada y la desencripta.
   */
  verificarCadena(){
    if (this.verificar.valid) {

      console.log('Formulario válido:', this.verificar.value);

      const cadena = this.verificar.get('cadena')?.value;

      this.desencriptarService.desencriptar( cadena )
      .subscribe( (respuesta:any) => {
        console.log("respuestas: ", respuesta);
        this.showDesencriptado = true;
        this.msgDesencriptado = respuesta.mensaje;
      },
      (error:any) =>{
        this.showMsg = true;
        this.mensaje = "Error al encriptar nombre";
      });

    } else {
      this.showMsg = true;
      this.mensaje = 'Por favor, completa el campo correctamente.';
    }
  }

}
