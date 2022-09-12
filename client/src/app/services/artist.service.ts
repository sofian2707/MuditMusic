import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
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


//OBTENER ARTISTAS
getArtists(token:any, page:any): Observable<any>{
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
  let options = {headers: headers};
  return this.http.get(this.url+'artists/'+page, options);
  
}

//OBTENER ARTISTA por id
getArtistbyId(token:any, id:string): Observable<any>{
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
  let options = {headers: headers};
  return this.http.get(this.url+'artist/'+id, options);
  
}

    //AGREGAR ARTISTA
    addArtist(token: any, artist: Artist): Observable<any>{
        let params = JSON.stringify(artist);
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
        return this.http.post(this.url+'artist', params, {headers: headers});
    }

     //Editar ARTISTA
     editArtist(token:any, id: string, artist: Artist): Observable<any>{
      let params = JSON.stringify(artist);
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
      let options = {headers: headers};
      return this.http.put(this.url+'artist/'+id, params, options);
  }

  //ELIMINAR ARTISTA por id
deleteArtist(token:any, id:string): Observable<any>{
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
  let options = {headers: headers};
  return this.http.delete(this.url+'artist/'+id, options);

  }

  
}
