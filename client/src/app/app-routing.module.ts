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

const routes: Routes = [
  {
    path: '',
    redirectTo:'home',
    pathMatch:'full'
  },
  { path: 'crear-artista', component: ArtistAddComponent },
  { path: 'home', component: HomeComponent },
  { path: 'datos', component: UserEditComponent },
  { path: 'artistas/:page', component: ArtistListComponent},
  { path: '**', component: HomeComponent},
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
