import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  dataProductos:ProductosElement[]=[];

  title = "Lista de productos";
  
  productos:any;
  constructor(private http:HttpClient) { }
  ngOnInit(): void {
    this.http.get('https://dummyjson.com/products').subscribe(data=>{
      console.log(data);
      this.processProductosResponse(data);
    });
  }
  processProductosResponse(resp:any){
    const dataProductos:ProductosElement[]=[];
     
    let listProductos = resp;
    console.log("Ah ingresado al listado de productos: ",listProductos.products);
    listProductos.products.forEach((element:ProductosElement) => {
        this.dataProductos.push(element);
        console.log(dataProductos);
    });
    
  }

}

export interface ProductosElement {
  id: number;
  title: string;
  images: string[];
}