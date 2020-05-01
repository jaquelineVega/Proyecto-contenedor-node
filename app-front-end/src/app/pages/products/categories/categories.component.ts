import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: []
})
export class CategoriesComponent implements OnInit {

  misdatos: ProductModel[] = [];
  category: string='';

  constructor(private router: ActivatedRoute, private productsService: ProductsService, private route2:Router) { 
    this.router.params.subscribe(params =>{
      const category = params['category'];

      this.productsService.getCategory(category).subscribe((data: ProductModel[]) => {
        this.misdatos = data;
      });
    });
  }
  metodoCat(event:number)
  {
    console.log(event);
    this.route2.navigate(['/Home']);
  }

  ngOnInit() 
  {
    
  }

}
