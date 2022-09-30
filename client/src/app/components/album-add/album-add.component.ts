import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GLOBAL } from '../../services/global';

//modelos
import { Artist } from '../../models/artist';
import { Album } from 'src/app/models/album';

//servicios
import { UserService } from '../../services/user.service';
import { ArtistService } from 'src/app/services/artist.service';
import { AlbumService } from 'src/app/services/album.service';


@Component({
  selector: 'app-album-add',
  templateUrl: './album-add.component.html',
  styleUrls: ['./album-add.component.css'],
  providers: [UserService, ArtistService, AlbumService]
})

export class AlbumAddComponent implements OnInit {

  public titulo: string;
  public artist!: Artist;
  public album!: Album;
  public identity;
  public token;
  public url: string;
  public alertMessage: any;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private AlbumService: AlbumService,
    private UserService: UserService,
    private ArtistService: ArtistService
  ) {
    this.titulo = 'Crear nuevo album';
    this.identity = this.UserService.getIdentity();
    this.token = this.UserService.getToken();
    this.url = GLOBAL.url;
    this.album = new Album('','', '', 2017, '', '');

    
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    this.route.params.forEach((params: Params) => {
      let artist_id = params['artist'];
      this.album.artist = artist_id;

      this.AlbumService.addAlbum(this.token, this.album).subscribe({
        next: (response) => {
          if(!response.album){
						this.alertMessage = 'Error en el servidor';
            
					}else{
						this.alertMessage = '¡El album se ha creado correctamente!';
						this.album = response.album;
            this.router.navigate(['/editar-album', response.album._id]);
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



}



