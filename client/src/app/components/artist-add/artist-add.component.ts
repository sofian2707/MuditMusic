import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from '../../models/artist';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-artist-add',
  templateUrl: './artist-add.component.html',
  styleUrls: ['./artist-add.component.css'],
  providers:[UserService, ArtistService]
})
export class ArtistAddComponent implements OnInit {

public titulo: string;
public artist!: Artist;
public identity;
public token;
public url: string;
public alertMessage: any;
public errorMessage: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private UserService: UserService,
    private ArtistService: ArtistService
  ) { 
    this.titulo = 'Crear nuevo artista';
    this.identity= this.UserService.getIdentity();
    this.token= this.UserService.getToken();
    this.url= GLOBAL.url;
    this.artist = new Artist('','','','');
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.artist);
    this.ArtistService.addArtist(this.token, this.artist).subscribe({
      next: (response) => {

        if(!response.artist){
          this.alertMessage= 'Error en el servidor';
        }else{
          this.alertMessage= 'Artista creado correctamente';
          this.artist=response.artist;
          this.router.navigate(['/editar-artista/', response.artist._id ]);
        }
      },
      error: (error) => {
        var alertMessage:any = error;
        if(alertMessage != null){
          this.alertMessage = JSON.parse(error);
          console.log(alertMessage);
        }
      }
    })
  }


}
