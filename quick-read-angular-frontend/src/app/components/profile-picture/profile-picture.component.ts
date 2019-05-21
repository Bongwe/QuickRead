import { Component, OnInit } from '@angular/core';
import {profileReducer} from "../../store/reducers/profile.reducer";

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSelectPrifilePicture(pictureName:string) {
    alert(pictureName);
  }
}
