import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { SongService } from 'src/app/services/song.service';
import { Song } from 'src/app/models/song';
import { error } from 'jquery';
import { FavsongService } from 'src/app/services/favsong.service';
import { ArtistService } from 'src/app/services/artist.service';
import { AlbumService } from 'src/app/services/album.service';
import { Artist } from 'src/app/models/artist';
import { Album } from 'src/app/models/album';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  public favsong: any[] = [];
  public songs!: Song[];
  public identity;
  public token;
  public url: string;
  public alertMessage: any;
  public artist!: Artist;
  public albums!: Album[];
  public album!: Album;
  public AlbumId!: any;
  public albumImage!: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private SongService: SongService,
    private FavSongService: FavsongService,
    private ArtistService: ArtistService,
    private AlbumService: AlbumService,

  ) {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {

    this.getFavoriteSongs();
    
  }


  getFavoriteSongs() {
    // Obtén el token de autenticación
    const token = this.token;
  
    // Obtén las canciones favoritas del usuario
    this.FavSongService.getFavoriteSongs(token).subscribe({
      next: (response) => {
        this.favsong = response.favoriteSongs;
  
        // Itera sobre cada objeto de canción favorita
        this.favsong.forEach((songObj: any) => {
          // Obtiene el ID del álbum de la canción actual
          const albumId = songObj.song.album;
  
          // Obtiene los detalles del álbum correspondiente al ID
          this.AlbumService.getAlbum(this.token, albumId).subscribe({
            next: (response) => {
              if (response.album) {
                const album = response.album;
  
                // Guarda el artista del álbum en la propiedad artist del objeto songObj
                this.artist = album.artist;
                this.albumImage = album.image;
    
                
              } else {
                console.log('No se encontró el álbum');
              }
            },
            error: (error) => {
              var alertMessage: any = error;
              if (alertMessage != null) {
                this.alertMessage = error;
                console.log(alertMessage);
              }
            }
          });
        });
      },
      error: (error) => {
        var alertMessage: any = error;
        if (alertMessage != null) {
          this.alertMessage = error;
          console.log(alertMessage);
        }
      }
    });
  }
  


  
    onDeleteFavSong(id:any){
      this.FavSongService.deleteFavoriteSong(this.token, id).subscribe({
        next: (response) => { 
          if(!response.favsong){
            this.getFavoriteSongs();
          }else{
            console.log('Error en el servidor');
          }
          
        },
        error: (error) => {
          var alertMessage:any = error;
          if(alertMessage != null){
            this.alertMessage = error;
            console.log(alertMessage);
          }
         }
    });
    }
  




  startPlayer(song:any){
    
      let song_player = JSON.stringify(song);
      let artist_song = JSON.stringify(this.artist);
      let file_path = this.url + 'get-file-song/' + song.file;
      let image_path = this.url + 'get-image-album/' + this.albumImage;
    
      localStorage.setItem('sound_song', song_player);
      localStorage.setItem('artist_song', artist_song);

      document.getElementById("mp3-source")!.setAttribute("src", file_path);
      (document.getElementById("player") as any).load();
      (document.getElementById("player") as any).play();

      document.getElementById('play-song-title')!.innerHTML = song.name;
      document.getElementById('not-title')!.innerHTML = "";
      document.getElementById('play-song-artist')!.innerHTML = this.artist.name;
      document.getElementById('play-image-album')!.setAttribute('src', image_path);

  }









}


