import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {

  product: ProductModel[] = [];

  constructor
    (
      private router: ActivatedRoute, 
      private productSvc: ProductsService
    ) 
      { 
        this.router.params.subscribe(params => 
          {
            const codigo = params['codigo'];

             this.productSvc.getByCode(codigo).subscribe((data: ProductModel[]) =>
              { 
               
                this.product = data;
                console.log(data);
              });
          });
      }

  transform(category: string){
    
  }
    ngOnInit() {
  }
  

}
