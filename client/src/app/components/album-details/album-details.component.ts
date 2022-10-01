import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Album } from '../../models/album';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css'],
  providers: [UserService, AlbumService, AlbumService]
})
export class AlbumDetailsComponent implements OnInit {
  public album!: Album;
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
		private albumService: AlbumService
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
