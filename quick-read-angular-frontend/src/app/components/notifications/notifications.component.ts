import { Component, OnInit } from '@angular/core';
import {selectAccounts, selectNotifications} from "../../store/selectors/profile.selectors";
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {IAccountState} from "../../store/reducers/profile.reducer";
import {INotification} from "../../store/reducers/notifications.reducer";
import {NotificationObj} from "../../models/NotificationObj";

import * as _ from 'lodash';

@Component({
  selector: 'app-display-errors',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  errorMessage: string;
  successMessage: string;

  errorFlag: boolean = false;
  successFlag: boolean = false;

  notification: NotificationObj;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.store.select(selectAccounts).subscribe((state: IAccountState) =>{
      if(state && state.accountErrorMessage){
        this.errorMessage = state.accountErrorMessage;
        this.errorFlag = true;
        this.successFlag = false;
      } else if (state && state.accountSuccessMessage) {
        this.successMessage = state.accountSuccessMessage;
        this.successFlag = true;
        this.errorFlag = false;
      } else {
        this.errorFlag = false;
        this.successFlag = false;
      }
    });

    this.store.select(selectNotifications).subscribe((state: INotification) =>{
      if(state && state.notification){
        this.notification = _.cloneDeep(state.notification);
      } else {
        this.notification = null;
      }
    });
  }

  resetErrorFlag(){
    this.errorFlag = false;
  }

  resetSuccessFlag(){
    this.successFlag = false;
  }

  clearNotification() {
    this.notification = null;
  }

}
