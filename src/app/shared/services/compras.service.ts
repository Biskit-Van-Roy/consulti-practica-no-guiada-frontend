import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
const base_url = environment.base_url;
@Injectable({providedIn:'root'})
export class ComprasService{
    constructor(private http:HttpClient){}
    getPromociones(){
        const endpoint = `${base_url}/compras/all`;
        return this.http.get(endpoint);

    }
    updatePromociones(body:any,id:number){
        const endpoint = `${base_url}/compras/${id}`;
        return this.http.put(endpoint,body)
    }
    deletePromociones(id:number){
        const endpoint = `${base_url}/compras/${id}`
        return this.http.delete(endpoint);
        
    }
    
    save(body:any){
        console.log(body)
        const endpoint = `${base_url}/compras/save`;
        return this.http.post(endpoint,body);
    }
}