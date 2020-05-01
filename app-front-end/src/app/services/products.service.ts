import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/models';
import { Observable } from 'rxjs';
import { filter } from 'minimatch';
import { Login } from '../models/models';

const URL_PRODUCTS = 'assets/data/productos.json';
const URL_LOGIN = 'http://192.168.64.137:5000/login';
const URL_PRODUCTOS = 'http://192.168.64.137:5000/products2';
const URL_PRODUCTOSCATEGORIAS = 'http://192.168.64.137:5000/productCategoria2/';
const URL_PRODUCTOSCRITERIO = 'http://192.168.64.137:5000/search2/';
const URL_PRODUCTOSCODE = 'http://192.168.64.137:5000/productId/';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  product: ProductModel = {};

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(URL_PRODUCTS)
  }

  Login(login: Login){
    return this.http.post(URL_LOGIN, login);
  }

  getCategory(category: string) {
    const liga = URL_PRODUCTOSCATEGORIAS + category;
    return new Observable(observer => {
      this.http.get(liga).subscribe((data: ProductModel[])=>{
        const filter = data['result']['productos'];
        observer.next(filter);
      })
    })
  }

  getByCode(codigo: string)
  {
    return new Observable(observer => {
      const liga = URL_PRODUCTOSCODE + codigo;
      this.http.get(liga).subscribe((data: ProductModel[]) => {
          const filter = data['result']['productos'];
          observer.next(filter);
          console.log(liga);
        });
    });
  }

  getByDescripcion(code: string)
  {
    return new Observable(observer => {
      this.http.get(URL_PRODUCTOS).subscribe((data: ProductModel[]) => {
        const filter = data.filter(item => item.codigo == code);
        observer.next(filter[0]);
      });
    });
  }

  getCriterio(criterio: string, parametro: string) {  
    const liga = URL_PRODUCTOSCRITERIO + criterio + "/" +  parametro;
    return new Observable(observer => {
      this.http.get(liga).subscribe((data: ProductModel[])=>{
        const filter = data['result']['productos'];
        observer.next(filter);
      });
    });
}
}

