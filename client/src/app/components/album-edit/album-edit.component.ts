import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GLOBAL } from '../../services/global';

//modelos
import { Album } from 'src/app/models/album';

//servicios
import { UserService } from '../../services/user.service';
import { AlbumService } from 'src/app/services/album.service';
import { UploadService } from 'src/app/services/upload.service';


@Component({
  selector: 'app-album-edit',
  templateUrl: './album-edit.component.html',
  styleUrls: ['./album-edit.component.css'],
  providers: [UserService, AlbumService, UploadService]
})

export class AlbumEditComponent implements OnInit {

  public titulo: string;
  public album!: Album;
  public identity;
  public token;
  public url: string;
  public alertMessage: any;
  public is_edit!: boolean;
  public filesToUpload!: Array<File>;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private AlbumService: AlbumService,
    private UserService: UserService,
    private UploadService: UploadService
  ) {
    this.titulo = 'Editar album';
    this.identity = this.UserService.getIdentity();
    this.token = this.UserService.getToken();
    this.url = GLOBAL.url;
    this.album = new Album('','', '', 2017, '', '');
    this.is_edit = true;
  }

  ngOnInit(): void {

    //conseguir el album
    this.getAlbum();
    
  }

  getAlbum() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];

      this.AlbumService.getAlbum(this.token, id).subscribe({
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


  onSubmit() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];

      this.AlbumService.editAlbum(this.token, id, this.album).subscribe({
        next: (response) => {
          	
					if(!response.album){
						this.alertMessage = 'Error en el servidor';
					}else{
						this.alertMessage = '¡El album se ha actualizado correctamente!';
            setTimeout(() => {
              this.router.navigate(['/artista', response.album.artist]);
            },
              1000);

						if(!this.filesToUpload){
              //redirigir
              setTimeout(() => {
                this.router.navigate(['/artista', response.album.artist]);
              },
                1000);
						}else{
							//Subir la imagen del album
							this.UploadService.makeFileRequest(this.url+'upload-image-album/'+id, [], this.filesToUpload, this.token, 'image')
								.then(
									(result) => {
                    setTimeout(() => {
                      this.router.navigate(['/artista', response.album.artist]);
                    },
                      1000);
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