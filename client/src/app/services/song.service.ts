import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Song } from "../models/song";
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class SongService {
    public url: string;


    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }


    getSongs(token: any, albumId = null): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
        let options = { headers: headers };

        if (albumId == null) {
            return this.http.get(this.url + 'songs', options)
        } else {
            return this.http.get(this.url + 'songs/' + albumId, options)
        }

    }


    getSong(token: any, id: string): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
        let options = { headers: headers };
        return this.http.get(this.url + 'song/' + id, options);
    }

    addSong(token: any, song: Song): Observable<any> {
        let params = JSON.stringify(song);
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
        let options = { headers: headers };
        return this.http.post(this.url + 'song', params, options);
    }

    editSong(token: any, id: string, song: Song): Observable<any> {
        let params = JSON.stringify(song);
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
        let options = { headers: headers };
        return this.http.put(this.url + 'song/' + id, params, options);
    }

    deleteSong(token: any, id: string): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
        let options = { headers: headers };

        return this.http.delete(this.url + 'song/' + id, options);
    }


}
