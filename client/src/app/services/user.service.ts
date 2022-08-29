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
    public identity:any;
    public token:any;
    public url:string;

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    signup(user_to_login: any, gethash='null'): Observable<any>{
        if(gethash !=null){
            user_to_login.gethash = gethash;
        }
        //Convertir a string objeto que se recibe
       let json = JSON.stringify(user_to_login);
       let params = json;
       let headers = new HttpHeaders().set('Content-Type', 'application/json');
       return this.http.post(this.url+'login',params, {headers: headers});
    }
   

    getIdentity(){
      let identity = JSON.parse(localStorage.getItem('identity')!);

      if(identity != "undefined"){
        this.identity = identity;
      }else{
        this.identity = null;
      }
      return this.identity;
    }

    
    
    getToken(){
      let token = (localStorage.getItem('token')!);

      if(token != "undefined"){
        this.token = token;
      }else{
        this.token = null;
      }
      return this.token;

    }
















  }

