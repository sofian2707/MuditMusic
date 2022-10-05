import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { SongService } from 'src/app/services/song.service';
import { Song } from 'src/app/models/song';

@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.css'],
  providers:[UserService, SongService]
})
export class SongAddComponent implements OnInit {

public titulo: string;
public song!: Song;
public identity;
public token;
public url: string;
public alertMessage: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private UserService: UserService,
    private SongService: SongService
  ) { 
    this.titulo = 'Crear nueva cancion';
    this.identity= this.UserService.getIdentity();
    this.token= this.UserService.getToken();
    this.url= GLOBAL.url;
    this.song = new Song(1,'','','','');
  }

  ngOnInit(): void {
  }
  
  onSubmit() {
    this.route.params.forEach((params: Params) => {
      let album_id = params['album'];
      this.song.album = album_id;

      this.SongService.addSong(this.token, this.song).subscribe({
        next: (response) => {
          if(!response.song){
						this.alertMessage = 'Error en el servidor';
					}else{
						this.alertMessage = '¡La cancion se ha creado correctamente!';
						this.song = response.song;
            this.router.navigate(['/']);
            //this.router.navigate(['/editar-tema', response.song._id]);
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
