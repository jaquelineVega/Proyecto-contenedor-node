import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/models';
import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})

export class NavbarComponent implements OnInit {
  seleccionado : string = "";
  parametro : string = ""
  lista:string[]=["descripcion","codigo","proveedor", "precio"];
  misDatos: ProductModel[] = [];
  constructor(private router: Router, private productService: ProductsService){ }

  ngOnInit() {
  }
  search ()
  {
    this.productService.getCriterio(this.seleccionado, this.parametro).subscribe((data: ProductModel[])=>{
this.misDatos = data
console.log(data)

    });
   this.router.navigate(['/search', this.seleccionado, this.parametro])

  }
}
