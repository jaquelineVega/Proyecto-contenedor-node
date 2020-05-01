import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/models';
import { ProductsService } from 'src/app/services/products.service';

@Component({ selector: 'app-products', 
templateUrl: './products.component.html', 
styles: [] })
export class ProductsComponent implements OnInit {

  misdatos: ProductModel[] = [];

  constructor(private productsService: ProductsService) {
    this.productsService.getAll().subscribe((data: ProductModel[])=> {
      this.misdatos = data;
    })

    this.productsService.getCategory('Cars').subscribe((data: ProductModel[]) => {
      this.misdatos = data;
    });
  }
  
  ngOnInit() { }
}

