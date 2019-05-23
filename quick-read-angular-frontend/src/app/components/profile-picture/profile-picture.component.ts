import { Component, OnInit } from '@angular/core';
import {AddAccountProfilePicture, ClearAccountNotifications} from "../../store/actions/account.actions";
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
  }

  onSelectProfilePicture(pictureName:string) {
    this.store.dispatch( new AddAccountProfilePicture(pictureName));
  }

  onSubmit() {
    //cal an action to read all information from the store and submit it
  }
}
