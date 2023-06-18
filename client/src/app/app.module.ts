import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { UserEditComponent } from './components/user-edit/user-edit.component';


import { HomeComponent } from './components/home/home.component';

import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { ArtistAddComponent } from './components/artist-add/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit/artist-edit.component';
import { ArtistDetailsComponent } from './components/artist-details/artist-details.component';

import { AlbumAddComponent } from './components/album-add/album-add.component';
import { AlbumEditComponent } from './components/album-edit/album-edit.component';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';

import { SongEditComponent } from './components/song-edit/song-edit.component';
import { SongAddComponent } from './components/song-add/song-add.component';
import { PlayerComponent } from './components/player/player.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { FavoritesComponent } from './components/favorites/favorites.component';


@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    ArtistListComponent,
    HomeComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailsComponent,
    AlbumAddComponent,
    AlbumEditComponent,
    AlbumDetailsComponent,
    SongEditComponent,
    SongAddComponent,
    PlayerComponent,
    SearcherComponent,
    FavoritesComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
