import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album';
import { Song } from 'src/app/models/song';
import { GLOBAL } from 'src/app/services/global';
import { Artist } from '../../models/artist';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  public url: string;
	public song!: Song;
	public artist!: Artist;
	public album!: Album;
	public show: boolean;

	constructor(){
		this.url = GLOBAL.url;
		this.show = false;
	}

  ngOnInit(): void {

    var song = JSON.parse(localStorage.getItem('sound_song')!);

song.forEach((object: any) =>{
    console.log(song);
});

		if(song){
			this.song = song;
			this.show= true;
		}else{
			this.song = new Song('',1, "","","","");
		}
		
  }

}
