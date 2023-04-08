import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class PromocionesService{
    constructor(private http:HttpClient){}
    getPromociones(){
        const endpoint = "http://localhost:8080/api/v1/promociones/all";
        return this.http.get(endpoint);

    }
    updatePromociones(body:any,id:number){
        const endpoint = `http://localhost:8080/api/v1/promociones/${id}`;
        return this.http.put(endpoint,body)
    }
    deletePromociones(id:number){
        const endpoint = `http://localhost:8080/api/v1/promociones/${id}`
        return this.http.delete(endpoint);
        
    }
    
}