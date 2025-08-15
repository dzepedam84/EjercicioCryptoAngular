import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule  } from '@angular/forms';
import { EncriptarService } from '../../services/encriptar.service';

/**
 * Clase texto texto
 * @implements {HttpInterceptor}
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

  formulario!: FormGroup;
  nombre!: string;
  showMsg: boolean = false;  
  mensaje: string = '';
  showEncriptado: boolean = false;
  msgEncriptado: string = '';
  isListening: boolean = false; // Para controlar el estado del micrófono
  recognition: any;
  voz: boolean = false;

  constructor(private fb:FormBuilder, private encriptarService: EncriptarService){
    this.iniciar();
  }

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

  registrar(){
    if (this.formulario.valid) {
      // Procesar el formulario
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

      this.encriptarService.encriptar(this.nombre).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
      },
      error => {
        console.error('Error al enviar el nombre:', error);
      }
    );
    } else {
      this.showMsg = true;
      this.mensaje = 'Por favor, completa el formulario correctamente.';
    }
  }

}
