import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  user: string = "";
  nombres:string = "";
  apellidos:string = "";
  email:string = "";
  password:string = "";
  rol:number = 0;
  checkboxesUser = [
    { id: 1, value: 'Administrador', disabled: false },
    { id: 2, value: 'Usuario', disabled: false },
  ];
  
  constructor(private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
  }
  /**
   * Funcion para los checkboxes
   * 
   */
  onChangeU(event:any){
    console.log("lo toco");
    if(event.target.checked){
      this.checkboxesUser.forEach((checkbox)=>{
        if(checkbox.id != event.target.id){
          checkbox.disabled=true;
      
        }
        else{
          console.log("seleccionado el plan "+checkbox.id)
          this.rol = checkbox.id;
        }
      })
    }
    else{
      this.checkboxesUser.forEach((checkbox)=>{
        checkbox.disabled = false;
      })
    }
  }
  /**
   * Funcion para registrar al usuario
   */

  save(){
    const currentDate:any = new Date();
    const dateTime = currentDate.getDate();

    let bodyData={
      "user":this.user,
      "nombres":this.nombres,
      "apellidos":this.apellidos,
      "email":this.email,
      "password":this.password,
      "rol":this.rol
    };
    console.log(bodyData);
    this.http.post(`${base_url}/user/register`,bodyData,{responseType:'text'}).subscribe((resultData:any)=>{
      console.log(resultData);
      alert("Usuario registrado exitosamente");
    })
  }



}
