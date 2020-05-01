//Imports Angular
import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
//Imports Components
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
//Se crea este componente en caso de que no exista el que se busca
import { PagesNotFoundComponent } from './pages/pages-not-found/pages-not-found.component';
import { CarsComponent } from './pages/products/cars/cars.component';
import { CategoriesComponent } from './pages/products/categories/categories.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'params', component: SearchComponent},
    { 
        path: 'products', 
        component: ProductsComponent,
    children: [
        { path: 'categories/:category', component: CategoriesComponent },
        { path: '', redirectTo: 'categories/Cars', pathMatch: 'full'},
        { path: '**', redirectTo: 'categories/Cars', pathMatch: 'full'}
    ]
 },
    { path: 'search/:criterio/:parametro', component: SearchComponent},
    { path: 'product/:codigo', component: ProductComponent },
    { path: '', redirectTo:'/home', pathMatch:'full'},
    { path: '**', component: PagesNotFoundComponent },
];

@NgModule({
    //ForRoot es para manejo de rutas standard
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
