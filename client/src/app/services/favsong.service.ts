import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { map } from 'rxjs/operators';
import { Song } from '../models/song';


@Injectable({
  providedIn: 'root'
})
export class FavsongService {
  public url: string;
  

  constructor(private http: HttpClient) {
    this.url = GLOBAL.url;
}


addFavoriteSong(token: any, id: string): Observable<any> {
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
  let options = { headers: headers };
  const body = {};

  return this.http.post(this.url + '/favorite/'+ id, body, options);
}

getFavoriteSongs(token: any): Observable<any> {
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
  let options = { headers: headers };

  return this.http.get(this.url + '/favorite-songs', options);
}




}


