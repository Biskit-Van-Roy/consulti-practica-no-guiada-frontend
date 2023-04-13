import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

const base_url = environment.base_url;
@Injectable({
  providedIn:'root'
})
export class UserService{
  constructor(private http:HttpClient){}

  saveUser(body:any){
    const endpoint  = `${base_url}/evento/save`;
    return this.http.post(endpoint,body,{responseType:'text'});
  }

  getUsers(){
    const endpoint  = `${base_url}/evento/all`;
    return this.http.get(endpoint);
  }

  updateUser(body: any, id:number){
    const endpoint = `${base_url}/evento/${id}`;
    return this.http.put(endpoint, body);
  }
  deletePerfil(id:number){
    const endpoint = `${base_url}/evento/${id}`;
    return this.http.delete(endpoint);
  }
}