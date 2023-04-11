import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
const base_url = environment.base_url;
@Injectable({providedIn:'root'})
export class PromocionesService{
    constructor(private http:HttpClient){}
    getPromociones(){
        const endpoint = `${base_url}/promociones/all`;
        return this.http.get(endpoint);

    }
    updatePromociones(body:any,id:number){
        const endpoint = `${base_url}/promociones/${id}`;
        return this.http.put(endpoint,body)
    }
    deletePromociones(id:number){
        const endpoint = `${base_url}/promociones/${id}`
        return this.http.delete(endpoint);
        
    }
    getEventos(){
        const endpoint =  `${base_url}/evento/all`;
        return this.http.get(endpoint);
    }
    addEvent(body:any,id:number){
        console.log(body)
        const endpoint = `${base_url}/evento/${id}`;
        return this.http.put(endpoint,body);
    }
    
}