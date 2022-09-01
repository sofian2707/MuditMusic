import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from './models/user';
import { Observable } from "rxjs";
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { GLOBAL } from './services/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  providers: [UserService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'Musify';
  public user: User;
  public user_register: User;
  public identity: any;
  public token: any;
  public errorMessage: any;
  public alertRegister: any;
  public url: string;


constructor(private UserService: UserService, private router: Router){
  this.user = new User('','','','','','ROLE_USER','');
  this.user_register = new User('','','','','','ROLE_USER','');
  this.identity= this.UserService.getIdentity();
  this.token= this.UserService.getToken();
  this.url = GLOBAL.url;
  
}

ngOnInit(){
 console.log(this.identity);
 console.log(this.token);

 
}

public onSubmit(){

  //Conseguir datos del usuario identificado
  this.UserService.signup(this.user).subscribe({
    next: (response) => {
       console.log(response)
       let identity = response.user;
       this.identity = identity;

       if(!this.identity._id){
        alert("El usuario no esta correctamente identificado");
       }else{
        //Crear elemento en el localstorage para tener al usuario en sesion
        localStorage.setItem('identity', JSON.stringify(identity));

        //conseguir token para enviarselo a cada peticion http
        this.UserService.signup(this.user, 'true').subscribe({
          next: (response) => {
            let token = response.token;
            this.token = token;

            if(this.token.length <= 0){
              alert("El token no se genero correctamente");
            }else{
              //crear elemento en el localstorage para tener token disponible
              localStorage.setItem('token', token);
              //base para iniciar sesion otra vez
              this.user = new User('','','','','','ROLE_USER','');
            }
          },
          error: (error) => {
            var errorMessage:any = error;
            if(errorMessage != null){
              this.errorMessage = error;
              console.log(errorMessage);
            }
          }})
          

       }
      },
    error: (error) => {
      var errorMessage:any = error;
      if(errorMessage != null){
        this.errorMessage = error;
        console.log(errorMessage);
      }
     }
  })
 }

 logout(){
  localStorage.removeItem('identity');
  localStorage.removeItem('token');
  localStorage.clear();
  this.identity= null;
  this.token = null;
 }


 onSubmitRegister(){
  console.log(this.user_register);
  this.UserService.register(this.user_register).subscribe({
    next: (response) => {
      let user = response.user;
      this.user_register = user;

      if(!user._id){
        this.alertRegister = 'Error al registrarse';
      }else{
        this.alertRegister = 'El registro se ha realizado correctamente, identificate con '+this.user_register.email;
        this.user_register = new User('','','','','','ROLE_USER','');
      }
    },
    error: (error) => {
      var alertRegister:any = error;
      if(alertRegister != null){
        this.alertRegister = error;
        console.log(alertRegister);
      }
    }});
 }



}
