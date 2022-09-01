import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AppComponent } from './app.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'artista',
    pathMatch:'full'
  },
  { path: 'datos', component: UserEditComponent },
  { path: 'artista', component: ArtistListComponent},
  { path: '**', component: ArtistListComponent},
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
