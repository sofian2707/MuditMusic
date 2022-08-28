import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { throwError } from 'rxjs';
import { Observable } from "rxjs";
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit{
  title = 'client';
  public user!: User ;
  public identity: any;
  public token: any;


constructor(private UserService: UserService){
  this.user = new User('','','','','','ROLE_USER','');
}

ngOnInit(){
 
}

public onSubmit(){
  console.log(this.user);

  this.UserService.signup(this.user).subscribe(res =>{
    console.log(res);
  });
 
}

}
