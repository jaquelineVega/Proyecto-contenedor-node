import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  productlist: ProductModel[] = [];
  criterio: string = 'proveedor';
  parametro: string = 'Gear';

  constructor(private router:ActivatedRoute, private productsService: ProductsService) { 
    
    this.router.params.subscribe(params => {
      this.criterio = params ['criterio']
      this.parametro = params ['parametro']
      
      this.productsService.getCriterio(this.criterio, this.parametro).subscribe((data:ProductModel[]) =>
       {
        this.productlist = data;
        console.log("search" + data);
        
      });
      

    })
  }
 
  ngOnInit() {
  }


}
