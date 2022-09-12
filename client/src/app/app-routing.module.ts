import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

//import user
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AppComponent } from './app.component';

//import artist
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { ArtistAddComponent } from './components/artist-add/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit/artist-edit.component';
import { ArtistDetailsComponent } from './components/artist-details/artist-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'home',
    pathMatch:'full'
  },
  {path: 'artista/:id', component: ArtistDetailsComponent},
  { path: 'crear-artista', component: ArtistAddComponent },
  { path: 'editar-artista/:id', component: ArtistEditComponent },
  { path: 'home', component: HomeComponent },
  { path: 'datos', component: UserEditComponent },
  { path: 'artistas/:page', component: ArtistListComponent},
  { path: '**', component: HomeComponent}

];

export const appRoutingProviders: any[] = [];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
