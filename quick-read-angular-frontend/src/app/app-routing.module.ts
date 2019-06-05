import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {SearchComponent} from "./components/search/search.component";
import {InterestsComponent} from "./components/interests/interests.component";
import {AvatarComponent} from "./components/profile-picture/avatar.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {QuickReadGuard} from "./quick-read.guard";
import {ProfileComponent} from "./components/profile/profile.component";
import {ViewSectionsComponent} from "./components/view-sections/view-sections.component";
import {BookShelfComponent} from "./components/book-shelf/book-shelf.component";
import {SectionComponent} from "./components/section/section.component";

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
    component: AvatarComponent,
    canActivate: [QuickReadGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [QuickReadGuard]
  },
  {
    path: 'viewSections',
    component: ViewSectionsComponent,
    canActivate: [QuickReadGuard]
  },
  {
    path: 'bookShelf',
    component: BookShelfComponent,
    canActivate: [QuickReadGuard]
  },
  {
    path: 'readSection',
    component: SectionComponent,
    canActivate: [QuickReadGuard]
  },
  {
    path: 'viewSections',
    component: ViewSectionsComponent,
    canActivate: [QuickReadGuard]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
