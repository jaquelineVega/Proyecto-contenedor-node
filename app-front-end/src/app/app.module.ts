//Modulos Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Llama rutas de la api
import { HttpClientModule} from '@angular/common/http';
//Componentes App
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { PagesNotFoundComponent } from './pages/pages-not-found/pages-not-found.component';
//Rutas App
import { AppRoutingModule } from './app.routes';
import { CarsComponent } from './pages/products/cars/cars.component';
import { CategoriesComponent } from './pages/products/categories/categories.component';
import { SearchComponent } from './pages/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ProductsComponent,
    ProductComponent,
    PagesNotFoundComponent,
    CarsComponent,
    CategoriesComponent,
    SearchComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule //Archivo de rutas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
