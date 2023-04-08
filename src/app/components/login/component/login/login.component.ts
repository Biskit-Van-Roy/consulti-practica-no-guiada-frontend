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
  if(this.user === "admin"&& this.password==="admin"){
    this.router.navigateByUrl('/sign-in');
  }
  else{
        alert("Email o contraseña incorrectos");

  }

  }
}
