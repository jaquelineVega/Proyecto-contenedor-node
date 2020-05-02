import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/models';
import { Observable } from 'rxjs';
import { filter } from 'minimatch';
import { Login } from '../models/models';

const URL_PRODUCTS = 'assets/data/productos.json';
const LOGIN = 'http://api.midomino.com/login';
const PRODUCTOS = 'http://api.midomino.com/products2';
const PRODUCTOSCATEGORIAS = 'http://api.midomino.com/productCategoria2/';
const PRODUCTOSCRITERIO = 'http://api.midomino.com/search2/';
const PRODUCTOSCODE = 'http://api.midomino.com/productId/';

@Injectable({ providedIn: 'root' })
export class ProductsService {

  product: ProductModel = {};

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(URL_PRODUCTS)
  }

  Login(login: Login){
    return this.http.post(LOGIN, login);
  }


  getCriterio(criterio: string, parametro: string) {  
    const liga = PRODUCTOSCRITERIO + criterio + "/" +  parametro;
    return new Observable(observer => {
      this.http.get(liga).subscribe((data: ProductModel[])=>{
        const filter = data['result']['productos'];
        observer.next(filter);
      });
    });
}

  getByCode(codigo: string)
  {
    return new Observable(observer => {
      const liga = PRODUCTOSCODE + codigo;
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
      this.http.get(PRODUCTOS).subscribe((data: ProductModel[]) => {
        const filter = data.filter(item => item.codigo == code);
        observer.next(filter[0]);
      });
    });
  }

  getCategory(category: string) {
    const liga = PRODUCTOSCATEGORIAS + category;
    return new Observable(observer => {
      this.http.get(liga).subscribe((data: ProductModel[])=>{
        const filter = data['result']['productos'];
        observer.next(filter);
      })
    })
  }

}

