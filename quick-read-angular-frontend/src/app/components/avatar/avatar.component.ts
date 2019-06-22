import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  AddAccountProfilePicture, UpdateAccountAction
} from "../../store/actions/account.actions";
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {ClearNotificationMessageAction, SetNotificationMessageAction} from "../../store/actions/notofication.actions";
import {qrAccount} from "../../models/Account";
import {selectAccounts, selectNotifications} from "../../store/selectors/app.selectors";
import {IAccountState} from "../../store/reducers/account.reducer";

import * as _ from 'lodash';
import {Router} from "@angular/router";
import {NotificationObj} from "../../models/NotificationObj";
import {INotification} from "../../store/reducers/notifications.reducer";

@Component({
  selector: 'app-profile-picture',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit, OnDestroy {

  private interests: string;
  private profilePicture: string;
  private selectedAccount: qrAccount;
  private updateMessage = "Account updated successfully";

  constructor(private store: Store<IAppState>, private router: Router) { }

  ngOnInit() {
    this.store.select(selectAccounts).subscribe((state: IAccountState) =>{

      if(state && state.selectedAccount){
        this.interests = _.cloneDeep(state.interests);
        this.profilePicture = _.cloneDeep(state.profilePicture);
        this.selectedAccount = _.cloneDeep(state.selectedAccount);

        this.store.select(selectNotifications).subscribe((state: INotification) =>{
          if(state && state.notification && state.notification.message == this.updateMessage) {
            this.router.navigate(['/search']);
          }
        });

      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch( new ClearNotificationMessageAction());
  }

  onSelectProfilePicture(pictureName:string) {
    let notification = new NotificationObj();
    notification.isError = false;
    notification.isSuccess = true;
    notification.message = pictureName + " was selected to represent you!";
    this.store.dispatch( new SetNotificationMessageAction(notification));
    this.store.dispatch( new AddAccountProfilePicture(pictureName));
  }

  onSubmit() {
    let account = this.selectedAccount;
    account.interests = this.interests;
    account.profile_picture = this.profilePicture;
    this.store.dispatch( new UpdateAccountAction(account));
  }
}
