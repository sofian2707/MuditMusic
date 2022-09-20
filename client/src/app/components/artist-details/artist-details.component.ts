import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Album } from '../../models/album';
import { Artist } from 'src/app/models/artist';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { ArtistService } from 'src/app/services/artist.service';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.css'],
  providers: [UserService, ArtistService, AlbumService]
})
export class ArtistDetailsComponent implements OnInit {
	public artist!: Artist;
	public albums!: Album[];
	public identity;
	public token;
	public url: string;
	public alertMessage:any;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService,
		private ArtistService: ArtistService,
		private albumService: AlbumService
	){
		this.identity = this.userService.getIdentity();
		this.token = this.userService.getToken();
		this.url = GLOBAL.url;
	}

  ngOnInit() {
   
    //llamar api para sacar artisa segun id 
    this.getArtist();
  }

  getArtist() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.ArtistService.getArtistbyId(this.token, id).subscribe({
        next: (response) => {
        	if(!response.artist){
						this.router.navigate(['/']);
					}else{
						this.artist = response.artist;

            // Sacar los albums del artista
						this.albumService.getAlbums(this.token, response.artist._id).subscribe({
              next: (response)=>{
                if(!response.albums){
                  this.alertMessage = 'Este artista no tiene albums';
                }else{
                  this.albums = response.albums;
                  console.log(this.albums)
                }
              },
              error: (error) => {
                var alertMessage: any = error;
                if (alertMessage != null) {
                  this.alertMessage = error
                  console.log(alertMessage);
                }
              }
            });


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

}
