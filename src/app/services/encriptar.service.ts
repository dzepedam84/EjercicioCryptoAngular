import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const urlBase = 'http://localhost:3000/api/registro';

@Injectable({
  providedIn: 'root'
})
export class EncriptarService {

  constructor(private http: HttpClient) { }

  encriptar(nombre: String){
        
    // Crear el objeto JSON
    const json = { nombre: nombre }; // Crear un objeto con la propiedad 'nombre'
    // Enviar la solicitud POST con el objeto JSON
    return this.http.post(urlBase, json);
  }

}
