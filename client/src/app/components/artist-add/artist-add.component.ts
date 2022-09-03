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
    this.artist = new Artist('','','')
  }

  ngOnInit(): void {
    console.log('artist add cargado')
    alert(this.ArtistService.addArtist())
  }

  onSubmit(){
    console.log(this.artist)
  }


}
