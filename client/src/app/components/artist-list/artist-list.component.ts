import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from '../../models/artist';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
public titulo: string;
public artist!: Artist[];
public identity;
public token;
public url: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private UserService: UserService
  ) { 
    this.titulo = 'Artistas';
    this.identity= this.UserService.getIdentity();
    this.token= this.UserService.getToken();
    this.url= GLOBAL.url;
  }

  ngOnInit(): void {
    console.log('artist list cargado')
  }

}
