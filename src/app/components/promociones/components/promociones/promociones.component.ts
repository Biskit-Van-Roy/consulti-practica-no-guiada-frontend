import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromocionesService } from 'src/app/shared/services/promociones.service';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;
export interface Evento{
  
  id: number;
  nombre: string;
  fecha:string
}
@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {
  
  nombre: string = "";
  fecha_inicio:string="";
  fecha_fin:string="";
  descuento:number=0;
  tipo:number = 1;
  vip:number=1;
  promocionesDetails=null;
  eventos=null;
  evento_seleccionado: Evento[]=[];  
  promocionesToUpdate = {
    id:0,
    nombre:"",
    descuento:0,
    fecha_inicio:"",
    fecha_final:"",
    eventos:0
  }
  eventoToUpdate={
    promocion:0
  }
  checkboxesVIP = [
    { id: 1, value: 'VIP', disabled: false },
    { id: 2, value: 'NORMAL', disabled: false },
  ];

  constructor(private router:Router, private promocionesService:PromocionesService, private http:HttpClient) { }

  ngOnInit(): void {
    this.getPromociones();
    this.getEventos();
  }
  /**
   * Get promociones
   */
    /**
   * Funcion para los checkboxes
   * 
   */
    onChangeU(event:any){
      console.log("lo toco");
      if(event.target.checked){
        this.checkboxesVIP.forEach((checkbox)=>{
          if(checkbox.id != event.target.id){
            checkbox.disabled=true;
        
          }
          else{
            console.log("seleccionado el plan "+checkbox.id)
            this.vip = checkbox.id;
          }
        })
      }
      else{
        this.checkboxesVIP.forEach((checkbox)=>{
          checkbox.disabled = false;
        })
      }
    }
  getPromociones(){
    this.promocionesService.getPromociones().subscribe((data:any)=>{
      console.log("Promociones: ", data);
      if(data.metadata[0].code=="00"){
        this.promocionesDetails = data.promocionesResponse.promociones;
      }
    })
  }
  getEventos(){
    this.promocionesService.getEventos().subscribe((data:any)=>{
      console.log("Eventos: ", data);
      if(data.metadata[0].code=="00"){
      this.eventos = data.eventoResponse.evento;
      }
    })
  }

  /**
   * Delete promociones
   */
  deletePromociones(id:any){
    this.promocionesService.deletePromociones(id).subscribe((resp)=>{
      console.log(resp);
    },
    err => console.log(err)
    );
  }
  /**
   * Update promociones
   */
  updatePromociones(promociones:any, id:number){
    this.promocionesToUpdate = promociones;
    console.log(this.promocionesToUpdate);
  }
  addEvento(evento:any,id:number){
    console.log(evento);

   this.evento_seleccionado.push(evento);
   alert("Se agrego el evento correctamente")
   console.log(this.evento_seleccionado)
   
/* 
   const endpoint  = `${base_url}/evento/${id}`;
   return this.http.post(endpoint,evento,{responseType:'text'}); */
  }
  edit(promociones:any, id:number){
    this.promocionesService.updatePromociones(this.promocionesToUpdate,id).subscribe((resp)=>{
      console.log(resp);
      alert("Se actualizo correctamente");
    },
    (err)=>{
      console.log(err);
    }
    )
  }
  /**
   * Save promociones
   */
  save(){
    const currentDate:any = new Date();
    const dateTime = currentDate.getDate();
    
   let bodyData = {
     nombre:this.nombre,
     fecha_inicio:this.fecha_inicio,
     fecha_final:this.fecha_fin,
     descuento:this.descuento,
     vip:this.vip,
     tipo:this.tipo,
     usuario_creador:"admin",
     fecha_creacion:dateTime,
     eventoId:this.evento_seleccionado[0].id,
     fecha_modificacion:dateTime
   };
   const uploadPromocion = new FormData();
   uploadPromocion.append('nombre',bodyData.nombre)
   uploadPromocion.append('fecha_inicio',bodyData.fecha_inicio)
   uploadPromocion.append('fecha_final',bodyData.fecha_final)
   uploadPromocion.append('descuento',bodyData.descuento.toString())
   uploadPromocion.append('vip',bodyData.vip.toString())
   uploadPromocion.append('tipo',bodyData.tipo.toString())
   uploadPromocion.append('eventoId',bodyData.eventoId.toString())
   uploadPromocion.append('usuario_creador',"admin")
   uploadPromocion.append('fecha_creacion',bodyData.fecha_creacion)
   uploadPromocion.append('fecha_modificacion',bodyData.fecha_modificacion)
   console.log(bodyData);
   this.promocionesService.save(uploadPromocion).subscribe((resp)=>{
    console.log(resp);
    alert("Se guardo correctamente");
    location.reload();
   });

   

 }
}
