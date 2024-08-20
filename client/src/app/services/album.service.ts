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

/**
     * Constructor del servicio AlbumService.
     * @param http Servicio HttpClient de Angular para realizar solicitudes HTTP.
     */

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    /**
     * Obtiene una lista de álbumes, con la opción de filtrar por el ID de un artista específico.
     * @param token Token de autenticación para la solicitud.
     * @param artistId ID del artista para filtrar los álbumes (opcional).
     * @returns Observable con la respuesta de la solicitud HTTP.
     */

    getAlbums(token: any, artistId = null): Observable<any> {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
        let options = { headers: headers };

         // Si artistId es nulo, se obtienen todos los álbumes; de lo contrario, se obtienen los álbumes de un artista específico

        if (artistId == null) {
            return this.http.get(this.url + 'albums', options)
        }else{
            return this.http.get(this.url + 'albums/' + artistId, options)
        }

    }

     /**
     * Obtiene los detalles de un álbum específico por su ID.
     * @param token Token de autenticación para la solicitud.
     * @param id ID del álbum que se desea obtener.
     * @returns Observable con la respuesta de la solicitud HTTP.
     */

    
	getAlbum(token:any, id: string): Observable<any>{
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
        let options = { headers: headers };
		return this.http.get(this.url+'album/'+id, options);
	}

     /**
     * Agrega un nuevo álbum a la base de datos.
     * @param token Token de autenticación para la solicitud.
     * @param album Objeto de tipo Album que se desea agregar.
     * @returns Observable con la respuesta de la solicitud HTTP.
     */

    addAlbum(token:any, album: Album): Observable<any>{
		let params = JSON.stringify(album);
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
        let options = { headers: headers };
		return this.http.post(this.url+'album', params, options);
	}

    /**
     * Edita un álbum existente en la base de datos.
     * @param token Token de autenticación para la solicitud.
     * @param id ID del álbum que se desea editar.
     * @param album Objeto de tipo Album con los datos actualizados.
     * @returns Observable con la respuesta de la solicitud HTTP.
     */

    editAlbum(token:any, id:string, album: Album): Observable<any>{
		let params = JSON.stringify(album);
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
        let options = { headers: headers };
		return this.http.put(this.url+'album/'+id, params, options);				
	}

    /**
     * Elimina un álbum de la base de datos por su ID.
     * @param token Token de autenticación para la solicitud.
     * @param id ID del álbum que se desea eliminar.
     * @returns Observable con la respuesta de la solicitud HTTP.
     */
    
    deleteAlbum(token:any, id: string): Observable<any>{
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8').set('Authorization', token);
        let options = { headers: headers };

		return this.http.delete(this.url+'album/'+id, options);
	}


}
