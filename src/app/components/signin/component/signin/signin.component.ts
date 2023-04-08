import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  nombre: string = "";
  fecha:string="";
  imagen:string="";
  precio:number=0;
  entradas:number = 0;

  constructor(private router: Router, private http:HttpClient) { }

  ngOnInit(): void {
  }

  save(){
      const currentDate:any = new Date();
      const dateTime = currentDate.getDate();
      
     let bodyData = {
       "nombre":this.nombre,
       "fecha":this.fecha,
       "imagen":this.imagen,
       "precio":this.precio,
       "entradas":this.entradas,
       "usuario_creador":"admin",
       "fecha_creacion":dateTime
     };
     console.log(bodyData);
     this.http.post(`${base_url}/evento/save`,bodyData,{responseType:'text'}).subscribe((resultData:any)=>{
       console.log(resultData);
       alert("Evento registrado exitosamente");
       this.router.navigateByUrl('');
     });
  
   }
}
