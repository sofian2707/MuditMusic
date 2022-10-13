import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/models/song';
import { GLOBAL } from 'src/app/services/global';
@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  public url: string;
	public song!: Song;

	constructor(){
		this.url = GLOBAL.url;
	}
  ngOnInit(): void {
    console.log('player cargado');

  }

}
