import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {  UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public userDetails:any;
  srcData:SafeResourceUrl[] | undefined;  
  userToUpdate = {
    id:0,
    nombre:"",
    fecha:"",
    precio:""
  }
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers(){
    this.userService.getUsers().subscribe((data:any)=>{
      
      console.log("Respuesta: ",data);
      const dateEvento:EventoElement[]=[];

      if(data.metadata[0].code=="00"){
        
        let lista = data.eventoResponse.evento;
        this.userDetails=lista;
      }
      console.log(this.userDetails);
    }, (error) => {
      console.log("error: ", error);
    }
    )
  }
  deleteUser(id:any){
    console.log(id);
    this.userService.deletePerfil(id).subscribe((resp)=>{
      console.log(resp);
    },
    err => console.log(err)
    );
  }

  updateUser(user:any, id:number){
    this.userToUpdate = user;
    console.log(this.userToUpdate);
  }
  edit(user:any,id:number){
    this.userService.updateUser(this.userToUpdate,id).subscribe((resp)=>{
      console.log(resp);
      alert("Se actualizo correctamente");
    },
    (err)=>{
      console.log(err);
    }
    
    )
  }



}

export interface EventoElement {
  
  id: number;
  nombre: string;
  fecha:string;
  fechas_compra:string[];
  imagen:any;
  precio:number;
  entradas:number;
  
}