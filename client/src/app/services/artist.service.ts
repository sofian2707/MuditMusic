import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import {map} from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
  })

  export class ArtistService {
    public url:string;

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addArtist(){
        
    }



  }