import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule  } from '@angular/forms';
import { DesencriptarService } from '../../services/desencriptar.service';

@Component({
  selector: 'app-verificar',
  imports: [CommonModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './verificar.component.html',
  styleUrl: './verificar.component.css'
})
export class VerificarComponent {

  verificar!: FormGroup;
  cadena!:string;
  showMsg: boolean = false;  
  mensaje: string = '';
  showDesencriptado: boolean = false;  
  msgDesencriptado: string = '';

  constructor(private fb:FormBuilder, private desencriptarService: DesencriptarService){
    this.iniciar();
  }

  iniciar(){
    this.verificar = this.fb.group({
      cadena: ['', [Validators.required]]
    });
  }

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
