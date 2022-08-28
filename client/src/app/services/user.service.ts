import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import {map} from 'rxjs/operators';



//.pipe(map(res => res.json()));

@Injectable({
    providedIn: 'root'
  })

  export class UserService {

    url:string ="";

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    signup(user_to_login: any, gethash='null'){
        if(gethash !=null){
            user_to_login.gethash = gethash;
        }
        //Convertir a string objeto que se recibe
       let json = JSON.stringify(user_to_login);
       let params = json;
       let headers = new HttpHeaders().set('Content-Type', 'application/json');
       return this.http.post(this.url+'login',params, {headers: headers});
    }


  }

