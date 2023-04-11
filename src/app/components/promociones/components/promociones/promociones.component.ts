import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromocionesService } from 'src/app/shared/services/promociones.service';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url;
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
  evento_seleccionado: number[]=[];  
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
   this.evento_seleccionado.push(id);
   alert("Se agrego el evento correctamente")
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
     "nombre":this.nombre,
     "fecha_inicio":this.fecha_inicio,
     "fecha_final":this.fecha_fin,
     "descuento":this.descuento,
     "vip":this.vip,
     "tipo":this.tipo,
     "usuario_creador":"admin",
     "fecha_creacion":dateTime,
     "eventos":this.evento_seleccionado
   };
   console.log(bodyData);
   this.http.post(`${base_url}/promociones/save`,bodyData,{responseType:'text'}).subscribe((resultData:any)=>{
     console.log(resultData.id);
     alert("Promocion registrada exitosamente");
     this.router.navigateByUrl('/promociones');
   });

 }

}
