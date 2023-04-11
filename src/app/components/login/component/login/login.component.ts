import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: string = "";
  password: string = "";

  constructor(private router: Router, private http:HttpClient) { }

  ngOnInit(): void {
  }
   Login(){
    console.log(this.user);
    console.log(this.password);

    let bodyData = {
      user:this.user,
      password:this.password
  };
  this.http.post(`${base_url}/user/login`,bodyData).subscribe((resultData:any)=>{
    console.log(resultData);
    if(resultData.message == "El correo no existe"){
      alert("Email no existe");
    } else if (resultData.message == "Login correcto admin"){
      this.router.navigateByUrl('/eventos');
    } else if(resultData.message == "Login correcto user"){
      this.router.navigateByUrl('/eventos-user');
    }
    else{
      alert("Email o contraseña incorrectos");
    }
  })

  }
}
