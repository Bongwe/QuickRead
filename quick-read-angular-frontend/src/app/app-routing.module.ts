import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {SearchComponent} from "./components/search/search.component";
import {InterestsComponent} from "./components/interests/interests.component";
import {ProfilePictureComponent} from "./components/profile-picture/profile-picture.component";

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'search', component: SearchComponent },
  { path: 'interests', component: InterestsComponent },
  { path: 'profile-picture', component: ProfilePictureComponent },
  /*{ path: '',   redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
