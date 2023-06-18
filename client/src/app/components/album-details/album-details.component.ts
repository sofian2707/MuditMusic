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
  public favsong!: [];
	public songs!: Song[];
  public artist!: Artist;
	public albums!: Album[];
	public identity;
	public token;
	public url: string;
	public alertMessage:any;
  public confirmado:any;

  constructor(
    private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private albumService: AlbumService,
    private SongService: SongService,
    private ArtistService: ArtistService,
    private FavSongService: FavsongService
  
  ) {
    this.identity = this.userService.getIdentity();
		this.token = this.userService.getToken();
		this.url = GLOBAL.url;
   }

  ngOnInit(): void {
    this.getAlbum();
  }


  getAlbum() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.albumService.getAlbum(this.token, id).subscribe({
        next: (response) => {
        	if(!response.album){
						this.router.navigate(['/']);
					}else{
						this.album = response.album;

            //sacar artista
            this.ArtistService.getArtistbyId(this.token, response.album.artist._id).subscribe({
              next: (response) => {
              if(!response.artist){
              this.alertMessage = 'No existe el artista';
              }else{
              this.artist = response.artist;
              console.log(this.artist)
              }
            },
            error: (error) => {
              var alertMessage: any = error;
              if (alertMessage != null) {
                this.alertMessage = error
                console.log(alertMessage);
              }
            }
            })


            //Sacar las canciones
            this.SongService.getSongs(this.token, response.album._id).subscribe({
              next: (response) => {
                if(!response.songs){
                  this.alertMessage = 'Este album no tiene canciones';
                }else{
                  this.songs = response.songs;
                }
              },
              error: (error) => {
                var alertMessage: any = error;
                if (alertMessage != null) {
                  this.alertMessage = error
                  console.log(alertMessage);
                }
              }
            })

					}
        },
        error: (error) => {
          var alertMessage: any = error;
          if (alertMessage != null) {
            this.alertMessage = error
            console.log(alertMessage);
          }
        }
      }
      )
    })
  }


  onDeleteConfirm(id:any){
    this.confirmado = id;
  }

  onCancelSong(){
    this.confirmado = null;
  }

  
  onDeleteSong(id:any){
    this.SongService.deleteSong(this.token, id).subscribe({
      next: (response) => { 
        if(!response.song){
          alert('Error en el servidor');
        }else{
          this.getAlbum();
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

  
  
  onAddFavoriteSong(id:any){
    const token = this.token;
    this.FavSongService.addFavoriteSong(this.token, id).subscribe({
      next: (response) => { 
        if(!response.favSong){
          alert('Error en el servidor');
        }else{
         this.favsong = response.favSong; 
         console.log(response)
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

 
  

}



  


