import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public titulo:string;
  public user!: User;
  public identity: any;
  public token: any;
  public alertMessage: any;

  constructor(private UserService: UserService) { 
    this.titulo = 'Actualizar mis datos';
    this.identity= this.UserService.getIdentity();
    this.token= this.UserService.getToken(); 
    this.user = this.identity;
  }

  ngOnInit(): void {
  }


  onSubmit(){
    this.UserService.updateUser(this.user).subscribe({
      next: (response) => {
        //this.user = response.user;
        if(!response.user){
          this.alertMessage = 'El usuario no se ha actualizado';
        }else{
          //this.user = response.user;
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.user= this.identity;
          this.alertMessage = 'El usuario se ha actualizado correctamente';
        }
      },
      error: (error) => {
        var alertMessage:any = error;
        if(alertMessage != null){
          this.alertMessage = error;
          console.log(alertMessage);
        }
      }
    })
  }
}
