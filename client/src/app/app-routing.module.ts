import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'datos', component: UserEditComponent },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
