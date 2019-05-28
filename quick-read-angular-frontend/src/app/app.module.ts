import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StoreModule } from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {AccountEffects} from "./store/effects/account.effect";
import {AccountService} from "./services/account.service";
import {HttpClientModule} from "@angular/common/http";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {appReducers} from "./store/reducers/app.reducers";
import { RegisterComponent } from './components/register/register.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import {BookEffects} from "./store/effects/book.effect";
import { DisplayErrorsComponent } from './components/display-errors/display-errors.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InterestsComponent } from './components/interests/interests.component';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RegisterComponent,
    MenuComponent,
    NavbarComponent,
    SearchComponent,
    DisplayErrorsComponent,
    InterestsComponent,
    ProfilePictureComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([AccountEffects, BookEffects]),
    StoreDevtoolsModule.instrument()
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
