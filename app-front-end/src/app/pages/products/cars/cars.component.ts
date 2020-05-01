import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ProductModel } from 'src/app/models/models';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styles: []
})
export class CarsComponent implements OnInit {

  @Input() products: ProductModel[];
  @Input() category: string='';
  @Input() onClickRedirect: EventEmitter<number> = new EventEmitter();
 misdatos: ProductModel[]=[];

  constructor(private productsService: ProductsService)
  {
    this.productsService.getCategory('cars').subscribe((data: ProductModel[])=>
    {
      this.misdatos= data;
    })

    
  }

  ngOnInit() {
  }

  ColorLabel (precio: number)
  {
    let color: string='';
    if (precio > 0 && precio<=30000)
    color:'warning'
    if (precio >30000 && precio <= 50000)
    color: 'sucess'
    if (precio > 50000)
    color: 'danger'

    return color

  }
  redirect (precio)
  { }

}