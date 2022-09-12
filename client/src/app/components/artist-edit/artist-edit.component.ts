import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Artist } from '../../models/artist';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { ArtistService } from 'src/app/services/artist.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.css'],
  providers: [UserService, ArtistService, UploadService]
})
export class ArtistEditComponent implements OnInit {

  public filesToUpload!: Array<File>;
  public titulo: string;
  public artist!: Artist;
  public identity;
  public token;
  public url: string;
  public alertMessage: any;
  public errorMessage: any;
  public is_edit: boolean;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private UploadService: UploadService,
    private UserService: UserService,
    private ArtistService: ArtistService
  ) {
    this.titulo = 'Editar artista';
    this.identity = this.UserService.getIdentity();
    this.token = this.UserService.getToken();
    this.url = GLOBAL.url;
    this.artist = new Artist('','', '', '');
    this.is_edit = true;
  }

  ngOnInit(): void {
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


  onSubmit() {
    console.log(this.artist);
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.ArtistService.editArtist(this.token, id, this.artist).subscribe({
        next: (response) => {
          	
					if(!response.artist){
						this.alertMessage = 'Error en el servidor';
					}else{
						this.alertMessage = '¡El artista se ha actualizado correctamente!';
						if(!this.filesToUpload){
              //this.router.navigate(['/artista', response.artist._id ]);
							this.router.navigate(['/artistas', 1]);
						}else{
							//Subir la imagen del artista
							this.UploadService.makeFileRequest(this.url+'upload-image-artist/'+id, [], this.filesToUpload, this.token, 'image')
								.then(
									(result) => {
                    this.router.navigate(['/artistas', 1]);
										//this.router.navigate(['/artista', response.artist._id]);
									},
									(error) => {
										console.log(error);
									}
								);
						}
          }
        },
        error: (error) => {
          var alertMessage: any = error;
          if (alertMessage != null) {
            this.alertMessage = error;
            console.log(alertMessage);
          }
        }
      })
    })
  }


  fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

}
