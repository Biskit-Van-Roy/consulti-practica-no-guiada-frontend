import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComprasService } from 'src/app/shared/services/compras.service';
import { PromocionesService } from 'src/app/shared/services/promociones.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-eventosvip-user',
  templateUrl: './eventosvip-user.component.html',
  styleUrls: ['./eventosvip-user.component.css']
})
export class EventosvipUserComponent implements OnInit {
  constructor(private router:Router,private userService:UserService, private promocionesService:PromocionesService, private comprasService:ComprasService) { }
  userDetails=null;
  promocionesDetails=null;
  precio:string="";
  promociones: any[]=[];
  promocionToUpdate = {
    id:0,
    nombre:"",
    descuento:"",
    fecha_inicio:"",
    fecha_final: "",
    vip:0,
    tipo:0,
    eventoId:"",
    usuario_creador:"Admin",
    fecha_creacion:"",
    fecha_modificacion:""
  }
  ngOnInit(): void {
    this.getUsers();
    this.getPromociones();
  }
  getUsers(){
    this.userService.getUsers().subscribe((data:any)=>{
      console.log("Eventos ",data);
      if(data.metadata[0].code=="00"){
        this.userDetails = data.eventoResponse.evento;
   
      }
      console.log(this.userDetails);
    }, (error) => {
      console.log("error: ", error);
    }
    )
  }
  comprar(body:any,id:number,precio:number,promocion:number,idE:number){
    console.log(body.evento.fechas_compra);
    let sePuede = false;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
     let todayJ = yyyy + '-' + mm + '-' + dd;
     console.log(todayJ)
    if(todayJ != body.fecha_inicio){
      alert("Aun no puede acceder a la promocion")
    }
    else{
 

            console.log(body.evento.fechas_compra)
    for(let i = 0; i<body.evento.fechas_compra.length;i++){
      if(todayJ==body.evento.fechas_compra[i]){
        sePuede=true;
      }
      console.log(sePuede)
    }
    if(sePuede){
      let cantidad = prompt("Ingrese la cantidad a comprar")
      console.log("cantidad: ",cantidad)
      console.log(precio);
      let fechas=body.evento.fechas_compra
      console.log(fechas);
      this.comprarE(cantidad,precio,promocion,id,idE)
     location.reload();
    }
    else{
      console.log("no se puede comprar")
      alert("No esta en una fecha asignada para comprar");
    }
    }
   
    };
  comprarE(cantidad:any,precio:number,descuento:any,id:any,idE:any){
    console.log(cantidad*precio);
    console.log("descuento: ",descuento);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
     let todayJ = mm + '/' + dd + '/' + yyyy;
    let precioTotal=(cantidad*precio)- cantidad*precio*(descuento/100);
    let compra ={
      fecha_compra: todayJ,
      entradas:cantidad,
      venta:precioTotal,
      id_evento: idE,
      usuario_creador:"Admin",
      usuario_modificador:"Admin",
      fecha_creacion: todayJ,
      fecha_modificacion: todayJ,
    }
    alert("El precio a pagar total: "+(cantidad*precio)+"\n Descuento: "+descuento+"\n El total a pagar es: "+precioTotal);
    this.comprasService.save(compra).subscribe((resp:any)=>{
      console.log(resp);
    });
    this.promocionesService.deletePromociones(id).subscribe((resp)=>{
  
      this.router.navigateByUrl('/eventos-user');
    },
    err => console.log(err)
    );
  }
  comprarEvento(body:any,precio:number,id:number){
    console.log(body.fechas_compra);
    let sePuede = false;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
     let todayJ = yyyy + '-' + mm + '-' + dd;
     console.log(todayJ)
     console.log(body.fecha)

      
    for(let i = 0; i<body.fechas_compra.length;i++){
      if(todayJ==body.fechas_compra[i]){
        sePuede=true;
        console.log(sePuede)
      }
   
    }
    
    if(sePuede){
      console.log("se puede comprar")
      let cantidad = prompt("Ingrese la cantidad a comprar")
      console.log("cantidad: ",cantidad)
      console.log(precio);
  
    
     this.culminarCompraE(cantidad,precio,id); 
     location.reload();
    }
    else{
      console.log("no se puede comprar")
      alert("No esta en una fecha asignada para comprar");
    }

    



  }
  culminarCompraE(cantidad:any, precio:number,id:number){
    console.log(cantidad);
    console.log(precio);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
     let todayJ = mm + '/' + dd + '/' + yyyy;
    let precioTotal=(cantidad*precio);
    let compra ={
      fecha_compra: todayJ,
      entradas:cantidad,
      venta:precioTotal,
      id_evento: id,
      usuario_creador:"Admin",
      usuario_modificador:"Admin",
      fecha_creacion: todayJ,
      fecha_modificacion: todayJ,
    }

    alert("Numero de entradas: "+(cantidad)+"\n El total a pagar es: "+precioTotal);
    this.comprasService.save(compra).subscribe((resp:any)=>{
      console.log(resp);

    });
     

  }
getPromociones(){
  this.promocionesService.getPromociones().subscribe((data:any)=>{
    console.log("Promociones: ",data.promocionesResponse.promociones)
   
    if(data.metadata[0].code=="00"){
      for(let i=0;i<data.promocionesResponse.promociones.length; i++){
        console.log(data.promocionesResponse.promociones[i].vip);
        if(data.promocionesResponse.promociones[i].vip==1){
          this.promociones.push(data.promocionesResponse.promociones[i])
         this.promocionesDetails = data.promocionesResponse.promociones[i];
          console.log(this.promociones);
        }
        
      }
   
      
      
    }
    console.log(this.promocionesDetails);
  })
}
}
