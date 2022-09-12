import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";
import { Album } from '../models/album';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})

export class AlbumService {
    public url: string;


    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }


    getAlbums(token: any, artistId = null): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
        let options = { headers: headers };

        if (artistId == null) {
            return this.http.get(this.url + 'albums', options)
        }else{
            return this.http.get(this.url + 'albums/' + artistId, options)
        }

    }

    
	getAlbum(token:any, id: string): Observable<any>{
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
        let options = { headers: headers };
		return this.http.get(this.url+'album/'+id, options);
	}

    addAlbum(token:any, album: Album): Observable<any>{
		let params = JSON.stringify(album);
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
        let options = { headers: headers };
		return this.http.post(this.url+'album', params, options);
	}

    editAlbum(token:any, id:string, album: Album): Observable<any>{
		let params = JSON.stringify(album);
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
        let options = { headers: headers };
		return this.http.put(this.url+'album/'+id, params, options);				
	}

    deleteAlbum(token:any, id: string): Observable<any>{
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
        let options = { headers: headers };

		return this.http.delete(this.url+'album/'+id, options);
	}


}
