import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

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
  fecha_compra:string ="";
  fechas: string[]=[];  

  constructor(private router: Router, private http:HttpClient) { }
  
  ngOnInit(): void {
  }
  addDate(){
    const fecha = new Date(this.fecha);
    const fecha2 = new Date(this.fecha_compra);
    if(fecha2.getTime()<fecha.getTime()){
      alert('Se agrego la fecha correctamente')
      this.fechas.push(this.fecha_compra);
      console.log(this.fechas);
    }
    else{
      alert('La fecha agregada debe ser menor a la fecha del evento')
    }

   
   

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
       "fecha_creacion":dateTime,
       "fechas_compra":this.fechas
     };
     console.log(bodyData);
     this.http.post(`${base_url}/evento/save`,bodyData,{responseType:'text'}).subscribe((resultData:any)=>{
       console.log(resultData);
       alert("Evento registrado exitosamente");
       this.router.navigateByUrl('/user');
     });
  
   }
}
