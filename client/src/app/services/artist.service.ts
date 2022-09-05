import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Artist } from '../models/artist';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
  })

  export class ArtistService {
    public url:string;
    

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addArtist(token: any, artist: Artist): Observable<any>{
        let params = JSON.stringify(artist);
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
        return this.http.post(this.url+'artist', params, {headers: headers});
    }



  }