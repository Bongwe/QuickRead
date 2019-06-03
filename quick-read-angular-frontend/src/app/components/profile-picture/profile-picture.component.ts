import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  AddAccountProfilePicture, ClearAccountMessagesAction,
  UpdateAccountAction
} from "../../store/actions/account.actions";
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {ClearNotificationMessage, SetNotificationMessage} from "../../store/actions/notofication.actions";
import {qrAccount} from "../../models/Account";
import {selectAccounts} from "../../store/selectors/profile.selectors";
import {IAccountState} from "../../store/reducers/profile.reducer";

import * as _ from 'lodash';
import {Router} from "@angular/router";
import {NotificationObj} from "../../models/NotificationObj";

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit, OnDestroy {

  private interests: string;
  private profilePicture: string;
  private selectedAccount: qrAccount;
  private accountUpdatedSuccessfully = "Account updated successfully";
  private accountUpdatedError = "Account updated error";

  constructor(private store: Store<IAppState>, private router: Router) { }

  ngOnInit() {
    this.store.select(selectAccounts).subscribe((state: IAccountState) =>{
      if(state && state.selectedAccount){

        this.interests = _.cloneDeep(state.interests);
        this.profilePicture = _.cloneDeep(state.profilePicture);
        this.selectedAccount = _.cloneDeep(state.selectedAccount);

        if(state.accountSuccessMessage == this.accountUpdatedSuccessfully){
          this.store.dispatch(new ClearAccountMessagesAction());
          this.router.navigate(['/search']);
        } else if (state.accountErrorMessage == this.accountUpdatedError) {
          let notification = new NotificationObj();
          notification.isError = true;
          notification.isSuccess = false;
          notification.message = this.accountUpdatedError;
          this.store.dispatch(new SetNotificationMessage(notification));
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch( new ClearNotificationMessage());
  }

  onSelectProfilePicture(pictureName:string) {
    let notification = new NotificationObj();
    notification.isError = false;
    notification.isSuccess = true;
    notification.message = pictureName + " was selected to represent you!";
    this.store.dispatch( new SetNotificationMessage(notification));
    this.store.dispatch( new AddAccountProfilePicture(pictureName));
  }

  onSubmit() {
    let account = this.selectedAccount;
    account.interests = this.interests;
    account.profile_picture = this.profilePicture;

    this.store.dispatch( new UpdateAccountAction(account));
    this.store.dispatch( new ClearNotificationMessage());
    //cal an action to read all information from the store and submit it
  }
}
