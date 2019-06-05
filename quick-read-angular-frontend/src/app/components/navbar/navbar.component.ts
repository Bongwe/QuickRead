import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {Router} from "@angular/router";
import {qrAccount} from "../../models/Account";
import * as sha512 from 'js-sha512';
import {
  AccountLoginAction,
  ClearSelectedAccountAction,
} from "../../store/actions/account.actions";
import {selectAccounts, selectNotifications} from "../../store/selectors/profile.selectors";
import {IAccountState} from "../../store/reducers/account.reducer";
import {ClearNotificationMessageAction} from "../../store/actions/notofication.actions";
import {INotification} from "../../store/reducers/notifications.reducer";

import * as _ from 'lodash';
import {SUCCESSFUL_LOGIN} from "../../models/Messages";
import {ClearCurrentSectionAction} from "../../store/actions/section.actions";
import {ClearBookShelfAction, ClearSectionsAction} from "../../store/actions/book-shelf.actions";
import {ClearSuggestedBooksAction} from "../../store/actions/suggested-books.actions";
import {ClearSettingsAction} from "../../store/actions/settings.actions";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  private baseLocation = "../../../assets/img/profilePicture/";
  private tempImg = "temp.png";
  public imageUrl: string;
  public selectedAccount: qrAccount;
  private userAvatar: string = undefined;

  constructor(private store: Store<IAppState>,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.setAvatar();
    this.store.select(selectAccounts).subscribe((state: IAccountState) =>{
      if(state && state.selectedAccount){
        this.selectedAccount = _.cloneDeep(state.selectedAccount);
        this.userAvatar = this.selectedAccount.profile_picture;
        this.setAvatar();
      }
    });

    this.store.select(selectNotifications).subscribe((state: INotification) =>{
      if(state && state.notification && state.notification.message == SUCCESSFUL_LOGIN) {
        this.store.dispatch(new ClearNotificationMessageAction());
        this.router.navigate(['/search']);
      }
    });

    this.loginForm = this.formBuilder.group({
      email: ['', ],
      password: ['', ],
    });
  }

  setAvatar() {
    if(this.userAvatar == undefined){
      this.imageUrl = this.baseLocation + this.tempImg;
    } else {
      this.imageUrl = this.baseLocation + this.userAvatar;
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(new ClearNotificationMessageAction());
  }

  public onSubmit() {
    let loginDetails = new qrAccount();
    if (this.loginForm.valid) {
      loginDetails.email = this.loginForm.controls['email'].value;
      loginDetails.password = sha512.sha512(this.loginForm.controls['password'].value);
      this.store.dispatch(new AccountLoginAction(loginDetails));
      this.loginForm.reset();
    }
  }

  public onLogoutClick () {
    this.userAvatar = undefined;
    this.setAvatar();
    this.store.dispatch(new ClearSelectedAccountAction());
    this.store.dispatch(new ClearSectionsAction());
    this.store.dispatch(new ClearSuggestedBooksAction());
    this.store.dispatch(new ClearBookShelfAction());
    this.store.dispatch(new ClearSettingsAction());
    this.router.navigate(['/']);
  }

  public onProfilePictureSelect() {
    this.router.navigate(['/profile']);
  }

  public onBookShelfSelect() {
    this.store.dispatch(new ClearCurrentSectionAction());
    this.store.dispatch(new ClearSectionsAction());
    this.router.navigate(['/search']);
  }

}
