import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {SearchComponent} from "./components/search/search.component";
import {InterestsComponent} from "./components/interests/interests.component";
import {ProfilePictureComponent} from "./components/profile-picture/profile-picture.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {QuickReadGuard} from "./quick-read.guard";

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [QuickReadGuard]
  },
  {
    path: 'interests',
    component: InterestsComponent,
    canActivate: [QuickReadGuard]
  },
  {
    path: 'profile-picture',
    component: ProfilePictureComponent,
    canActivate: [QuickReadGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
