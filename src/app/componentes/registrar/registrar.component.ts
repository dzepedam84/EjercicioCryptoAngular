import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule  } from '@angular/forms';
import { EncriptarService } from '../../services/encriptar.service';

/**
 * Componente para registrar un nombre y encriptarlo.
 * 
 * El usuario ingresar un nombre, 
 * utilizar reconocimiento de voz para llenar el campo, 
 * y encriptar el nombre ingresado.
 * 
 * @author Daniel Zepeda <correo@gmail.com>
 */
@Component({
  selector: 'app-registrar',
  imports: [CommonModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  /** Formulario para el registro */
  formulario!: FormGroup;
  /** Nombre ingresado por el usuario */
  nombre!: string;
  /** Mostrar un mensaje de error */
  showMsg: boolean = false;  
  /** Mensaje de error a mostrar */
  mensaje: string = '';
  /** Mostrar el nombre encriptado */
  showEncriptado: boolean = false;
  /** Mensaje que contiene el nombre encriptado */
  msgEncriptado: string = '';
  /** Indica si el micrófono está activo */
  isListening: boolean = false;
  /** Objeto para el reconocimiento de voz */
  recognition: any;
  /** Indica si se está utilizando la voz para llenar el campo */
  voz: boolean = false;

  /**
   * Crea una instancia de RegistrarComponent.
   * 
   * @param fb - FormBuilder para crear formularios.
   * @param encriptarService - Servicio para encriptar nombres.
   */
  constructor(private fb:FormBuilder, private encriptarService: EncriptarService){
    this.iniciar();
  }

  /**
   * Inicializa el formulario y configura el reconocimiento de voz.
   */
  iniciar(){
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.maxLength(15)]]
    });

    // Verificar si la API de reconocimiento de voz está disponible
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
      this.recognition.continuous = false; // No escuchar continuamente
      this.recognition.interimResults = false; // No mostrar resultados intermedios
      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        this.formulario.get('nombre')?.setValue(transcript); // Establecer el valor en el campo de entrada
      };
      this.recognition.onend = () => {
        this.isListening = false; // Cambiar el estado al finalizar
        this.voz = false;
      };
    } else {
      console.error('La API de reconocimiento de voz no es compatible con este navegador.');
    }

  }  

  /**
   * Alterna el estado del micrófono para el reconocimiento de voz.
   */
  toggleMicrofono() {
    if (this.isListening) {
      this.voz = false;
      this.recognition.stop(); // Detener el reconocimiento
    } else {
      this.voz = true;
      this.recognition.start(); // Iniciar el reconocimiento      
    }
    this.isListening = !this.isListening; // Cambiar el estado    
  }

  /**
   * Registra el nombre ingresado y lo encripta.
   * 
   * Si el formulario es válido, se envía el nombre al servicio de encriptación.
   * Muestra un mensaje de error si el formulario no es válido.
   */
  registrar(){
    if (this.formulario.valid) {
      
      console.log('Formulario válido:', this.formulario.value);

      this.encriptarService.encriptar( this.formulario.get('nombre')?.value )
      .subscribe( (respuesta:any) => {
        console.log("respuestas: ", respuesta);
        this.showEncriptado = true;
        this.msgEncriptado = respuesta.encriptado;
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
