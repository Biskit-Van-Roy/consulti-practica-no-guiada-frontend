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
  tipo:number = 0;
  promocionesDetails=null;
  promocionesToUpdate = {
    id:0,
    nombre:"",
    fecha_inicio:"",
    fecha_final:"",
    descuento:0,
    tipo:0

  }

  constructor(private router:Router, private promocionesService:PromocionesService, private http:HttpClient) { }

  ngOnInit(): void {
    this.getPromociones();
  }
  /**
   * Get promociones
   */
  getPromociones(){
    this.promocionesService.getPromociones().subscribe((data:any)=>{
      console.log("Promociones: ", data);
      if(data.metadata[0].code=="00"){
        this.promocionesDetails = data.promocionesResponse.promociones;
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
     "tipo":this.tipo,
     "usuario_creador":"admin",
     "fecha_creacion":dateTime
   };
   console.log(bodyData);
   this.http.post(`${base_url}/promociones/save`,bodyData,{responseType:'text'}).subscribe((resultData:any)=>{
     console.log(resultData);
     alert("Promocion registrada exitosamente");
     this.router.navigateByUrl('');
   });

 }

}
