import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Artist } from '../../models/artist';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  public titulo: string;
  public artists!: Artist[];
  public identity;
  public token;
  public url: string;
  public next_page;
  public prev_page;
  public alertMessage: any;
  public confirmado:any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private UserService: UserService,
    private ArtistService: ArtistService


  ) {
    this.titulo = 'Artistas';
    this.identity = this.UserService.getIdentity();
    this.token = this.UserService.getToken();
    this.url = GLOBAL.url;
    this.next_page = 1;
    this.prev_page = 1;
  }


  ngOnInit(): void {
   this.getArtists();

  }



  getArtists() {
    this.route.params.forEach((params: Params) => {
      let page = +params['page'];
      if (!page) {
        page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;

        if (this.prev_page == 0) {
          this.prev_page = 1;
        }
      }
      this.ArtistService.getArtists(this.token, page).subscribe({
        next: (response) => { 
          if(!response.artists){
            this.router.navigate(['/']);
          }else{
            this.artists = response.artists;
            console.log(this.artists);
          }
        },
        error: (error) => {
          var alertMessage:any = error;
          if(alertMessage != null){
            this.alertMessage = error;
            console.log(alertMessage);
          }
         }
      })
    })
  }

  onDeleteConfirm(id:any){
    this.confirmado = id;
  }

  onCancelArtist(){
    this.confirmado = null;
  }

  
    onDeleteArtist(id:any){
      this.ArtistService.deleteArtist(this.token, id).subscribe({
        next: (response) => { 
          if(response.artist){
            alert('Error en el servidor');
          }else{
            this.getArtists();
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
