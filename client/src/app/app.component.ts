import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { Observable } from "rxjs";
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit{
  title = 'Musify';
  public user: User;
  public identity: any;
  public token: any;
  public errorMessage: any;


constructor(private UserService: UserService){
  this.user = new User('','','','','','ROLE_USER','');
}

ngOnInit(){
 
}

public onSubmit(){
  console.log(this.user);

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
        //conseguir token para enviarselo a cada peticion http
        this.UserService.signup(this.user, 'true').subscribe({
          next: (response) => {
            let token = response.token;
            this.token = token;

            if(this.token.length <= 0){
              alert("El token no se genero correctamente");
            }else{
              //crear elemento en el localstorage para tener token disponible
              console.log(token);
              console.log(identity);
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









}
