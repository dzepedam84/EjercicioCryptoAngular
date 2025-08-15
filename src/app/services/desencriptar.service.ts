import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const urlBase = 'http://localhost:3000/api/verificar';

@Injectable({
  providedIn: 'root'
})
export class DesencriptarService {

  constructor(private http: HttpClient) { }

  desencriptar(cadena: String){
  
    console.log(cadena);    
    // Crear el objeto JSON
    const json = { nombre_encriptado: cadena }; 
    // Enviar la solicitud POST con el objeto JSON
    return this.http.post(urlBase, json);
  }

}
