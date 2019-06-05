import { Component, OnInit } from '@angular/core';
import {selectNotifications} from "../../store/selectors/profile.selectors";
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {INotification} from "../../store/reducers/notifications.reducer";
import {NotificationObj} from "../../models/NotificationObj";

import * as _ from 'lodash';

@Component({
  selector: 'app-display-errors',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notification: NotificationObj;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.store.select(selectNotifications).subscribe((state: INotification) =>{
      if(state && state.notification){
        this.notification = _.cloneDeep(state.notification);
      } else {
        this.notification = null;
      }
    });
  }

  clearNotification() {
    this.notification = null;
  }

}
