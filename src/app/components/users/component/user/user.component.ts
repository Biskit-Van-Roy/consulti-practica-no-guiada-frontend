import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import {  UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userDetails=null;
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
      console.log("Users: ",data);
      if(data.metadata[0].code=="00"){
        this.userDetails = data.eventoResponse.evento;
   
      }
      console.log(this.userDetails);
    }, (error) => {
      console.log("error: ", error);
    }
    )
  }
  deleteUser(id:any){
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

export interface UserElement {
  
  id: number;
  name: string;
}