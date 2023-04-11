import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-eventos-user',
  templateUrl: './eventos-user.component.html',
  styleUrls: ['./eventos-user.component.css']
})
export class EventosUserComponent implements OnInit {

  constructor(private userService:UserService) { }
  userDetails=null;
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
  comprar(){
    
  }
}
