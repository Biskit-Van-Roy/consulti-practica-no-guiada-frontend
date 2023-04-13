import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { now } from 'moment';

import { UserService } from 'src/app/shared/services/user.service';

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
  imagen:any;
  precio:number=0;
  entradas:number = 0;
  fecha_compra:string ="";
  fechas: string[]=[];  

  public eventoForm: FormGroup;
  constructor(private router: Router, private http:HttpClient, private fb:FormBuilder, private eventoService:UserService) { 
    this.eventoForm = this.fb.group({
      nombre:['',Validators.required],
      precio:['',Validators.required],
      entradas:['',Validators.required],
      imagen:['',Validators.required],
      fecha:['',Validators.required],
      fechas_compra:['',Validators.required]

    }
    )
  }
  
  ngOnInit(): void {
  }
  addDate(){
    const fecha1 = new Date(this.fecha);
    const fecha2 = new Date(this.fecha_compra);
    
    console.log(fecha1)
    console.log(fecha2);
    if(fecha2.getTime()< fecha1.getTime()){
      alert('Se agrego la fecha correctamente')
      this.fechas.push(this.fecha_compra);
      console.log(this.fechas);
    }
    else{
      alert('La fecha agregada debe ser menor a la fecha del evento')
    }   

  }
  onFileChanged(event: any){
    this.imagen = event.target.files[0];
    console.log(this.imagen);
  }

  save(){
    const currentDate:any = new Date();
    const dateTime = currentDate.getDate(now);
    
   let bodyData = {
    "nombre":this.nombre,
    "fecha":this.fecha,
    "precio":this.precio,
    "entradas":this.entradas,
    "usuario_creador":"Admin",
    "usuario_modificador":"Admin",
    "fecha_creacion":dateTime,
    "fecha_modificacion":dateTime,
    "fechas_compra":this.fechas,
    "id_promocion":0,
   };
   console.log(bodyData);
   this.http.post(`${base_url}/evento/save`,bodyData,{responseType:'text'}).subscribe((resultData:any)=>{
     console.log(resultData.id);
     alert("evento registrado exitosamente");
     this.router.navigateByUrl('/promociones');
   });
/*     const fecha1 = new Date(this.eventoForm.value.fecha);
    var datestr = (new Date(fecha1)).toUTCString();
    const currentDate:any = new Date();
      const dateTime = currentDate.getDate;
      console.log(this.eventoForm.get('fecha')?.value);
      let data = {
        nombre:this.eventoForm.value.nombre,
        fecha:this.eventoForm.get('fecha')?.value,
        imagen:this.imagen,
        precio:this.eventoForm.get('precio')?.value,
        entradas:this.eventoForm.get('entradas')?.value,
        usuario_creador:"Admin",
        usuario_modificador:"Admin",
        fecha_creacion:dateTime,
        fecha_modificacion:dateTime,
        fechas_compra:this.fechas,
        id_promocion:0,
      }
      const uploadImageData =  new FormData;
      uploadImageData.append('imagen',data.imagen);
      uploadImageData.append('nombre',data.nombre);
      uploadImageData.append('fecha',data.fecha);
      uploadImageData.append('precio',data.precio);
      uploadImageData.append('entradas',data.entradas);
      uploadImageData.append('usuario_creador',data.usuario_creador);
      uploadImageData.append('usuario_modificador',data.usuario_modificador);
      uploadImageData.append('fecha_creacion',data.fecha_creacion);
      uploadImageData.append('fecha_modificacion',data.fecha_modificacion);
      uploadImageData.append('fechas_compra',data.fechas_compra.toString());
      uploadImageData.append('id_promocion',data.id_promocion.toString());
      
    this.eventoService.saveUser(uploadImageData,).subscribe((data:any)=>{
      alert("Se guardo el evento");
    },(error:any)=>{
      alert(error);
    })
       */
    
  }
}
