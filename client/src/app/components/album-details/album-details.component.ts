import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Album } from '../../models/album';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { AlbumService } from 'src/app/services/album.service';
import { SongService } from 'src/app/services/song.service';
import { Song } from 'src/app/models/song';
import { ArtistService } from 'src/app/services/artist.service';
import { Artist } from 'src/app/models/artist';
import { error } from 'jquery';
import { FavsongService } from 'src/app/services/favsong.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css'],
  providers: [UserService, AlbumService, AlbumService, SongService]
})
export class AlbumDetailsComponent implements OnInit {
  public album!: Album;
  public favsong: any[] = [];
  public songs!: Song[];
  public artist!: Artist;
  public albums!: Album[];
  public identity;
  public token;
  public url: string;
  public alertMessage: any;
  public confirmado: any;
  public isFavorite: boolean = false;
  public Alerta: boolean = false;
  public Alertaexist: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private albumService: AlbumService,
    private SongService: SongService,
    private ArtistService: ArtistService,
    private FavSongService: FavsongService,


  ) {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
    this.url = GLOBAL.url;
     
  }

  ngOnInit(): void {
    this.getAlbum();

  }




  getAlbum() {
    // Observar los parámetros de la ruta actual
    this.route.params.forEach((params: Params) => {
      let id = params['id']; // Obtener el valor del parámetro 'id' de la URL

      // Llamar al servicio 'albumService' para obtener información del álbum
      this.albumService.getAlbum(this.token, id).subscribe({
        next: (response) => {
          if (!response.album) {
            // Si no se encuentra el álbum, redirigir a la página de inicio
            this.router.navigate(['/']);
          } else {
            // Almacenar la información del álbum en 'this.album'
            this.album = response.album;

            // Obtener información del artista asociado al álbum
            this.ArtistService.getArtistbyId(this.token, response.album.artist._id).subscribe({
              next: (response) => {
                if (!response.artist) {
                  // Si no se encuentra el artista, establecer un mensaje de alerta
                  this.alertMessage = 'No existe el artista';
                } else {
                  // Almacenar la información del artista en 'this.artist'
                  this.artist = response.artist;
                }
              },
              error: (error) => {
                // Manejar errores relacionados con la obtención del artista
                var alertMessage: any = error;
                if (alertMessage != null) {
                  this.alertMessage = error;
                  console.log(alertMessage);
                }
              }
            });

            // Obtener información de las canciones asociadas al álbum
            this.SongService.getSongs(this.token, response.album._id).subscribe({
              next: (response) => {
                if (!response.songs) {
                  // Si el álbum no tiene canciones, establecer un mensaje de alerta
                  this.alertMessage = 'Este álbum no tiene canciones';
                } else {
                  // Almacenar la información de las canciones en 'this.songs'
                  this.songs = response.songs;
                }
              },
              error: (error) => {
                // Manejar errores relacionados con la obtención de canciones
                var alertMessage: any = error;
                if (alertMessage != null) {
                  this.alertMessage = error;
                  console.log(alertMessage);
                }
              }
            });
          }
        },
        error: (error) => {
          // Manejar errores relacionados con la obtención del álbum
          var alertMessage: any = error;
          if (alertMessage != null) {
            this.alertMessage = error;
            console.log(alertMessage);
          }
        }
      });
    });
  }


  onDeleteConfirm(id: any) {
    this.confirmado = id;
  }

  onCancelSong() {
    this.confirmado = null;
  }


  onDeleteSong(id: any) {
    this.SongService.deleteSong(this.token, id).subscribe({
      next: (response) => {
        if (!response.song) {
          alert('Error en el servidor');
        } else {
          this.getAlbum();
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
  }


  startPlayer(song: any) {
    let song_player = JSON.stringify(song);
    let artist_song = JSON.stringify(this.artist);
    let file_path = this.url + 'get-file-song/' + song.file;
    let image_path = this.url + 'get-image-album/' + song.album.image;


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


  mostrarLaAlerta() {
    this.Alerta = true;
    setTimeout(() => {
      this.ocultarLaAlerta();
    }, 1700);
  }

  ocultarLaAlerta() {
    // Agregar la clase de desvanecimiento de salida
    this.Alerta = false;
    this.Alertaexist = false;
  }

  mostrarExist() {
    this.Alertaexist = true;
    setTimeout(() => {
      this.ocultarLaAlerta();
    }, 1500);
  }


  onAddFavoriteSong(id: any) {
    const token = this.token;

    this.FavSongService.addFavoriteSong(this.token, id).subscribe({
      next: (response) => {
        if (!response.favSong) {
          this.mostrarExist();
        } else {
          // Actualizar la lista de canciones favoritas con la respuesta del servidor
          this.favsong = response.favSong;
          // Establecer isFavorite en true para indicar que la canción está en favoritos
          this.isFavorite = true;
          this.mostrarLaAlerta();
        }98
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


}






