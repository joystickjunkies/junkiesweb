import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailserviceService {

  constructor(private http:HttpClient) { }
  
  sendEmail(formData:any){
    return this.http.post('https://joystickjunkies.azurewebsites.net/enviar-mensaje', formData)
  }
}
