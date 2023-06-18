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
  public confirmado: any;
  public artist!: Artist;

  public albums!: Album[];
  public album!: Album;

  public AlbumId!: any;

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
    const token = this.token; // Obtén el token de autenticación



    this.FavSongService.getFavoriteSongs(token).subscribe(
      {
        next: (response) => {
          this.favsong = response.favoriteSongs;

          // Iterar sobre el array de songs y obtener el ID del álbum de cada objeto song
          this.favsong.forEach((songObj: any) => {
            this.AlbumId = songObj.song.album;
          });

          this.AlbumService.getAlbum(this.token, this.AlbumId).subscribe({
            next: (response) => {
              if (response.album) {
                const album = response.album;
                this.artist = album.artist;
                // Acceder a los campos del álbum
                const albumName = album.name;
                const albumArtist = album.artist;
          
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
          



        },
        error: (error) => {
          var alertMessage: any = error;
          if (alertMessage != null) {
            this.alertMessage = error;
            console.log(alertMessage);
          }
        }
      }
    );
  }




}
