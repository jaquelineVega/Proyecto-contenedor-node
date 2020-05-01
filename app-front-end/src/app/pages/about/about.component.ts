import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Login } from 'src/app/models/models';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styles: []
})
export class AboutComponent implements OnInit {

contenidoForm: FormGroup;
  loginForm: FormGroup;
  loginSpiner: Boolean = true;
  upSpiner: Boolean = true;

  constructor( private productosService: ProductsService, private formBuilder: FormBuilder) {

    this.loginForm = this.formBuilder.group({     
      NombreUsuario: ['', Validators.required],
      Contrasenia: ['', Validators.required],
    })
   }

  ngOnInit() {}

    // Login(){
    //   this.loginSpiner = false;
    //   this.productosService.Login(this.loginForm.value).subscribe(login => {
    //     this.loginSpiner = true; 
    //     console.log(login);
    //     let login : Login = login;
        
    //       alert("BIENVENIDO(A) " + login.username);
    //       localStorage.setItem("usuario", JSON.stringify(usuario))
        
    //   });
    // }
}

