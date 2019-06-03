import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {selectAccounts, selectSettings} from "../../store/selectors/profile.selectors";
import {IAccountState} from "../../store/reducers/profile.reducer";
import {qrAccount} from "../../models/Account";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

import * as _ from 'lodash';
import {ClearAccountMessagesAction} from "../../store/actions/account.actions";
import {SetSettingsAction} from "../../store/actions/settings.actions";
import {Settings} from "../../models/Settings";
import {ISettingsState} from "../../store/reducers/settings.reducer";
import {ClearNotificationMessage} from "../../store/actions/notofication.actions";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private selectedAccount: qrAccount;
  private settings: Settings;
  public updateForm: FormGroup;
  public settingsForm: FormGroup;
  public readTimeOptions = [1,5,10,15,20,25,30];

  constructor(private store: Store<IAppState>,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.store.select(selectAccounts).subscribe((state: IAccountState) =>{
      if(state && state.selectedAccount){
        this.selectedAccount = _.cloneDeep(state.selectedAccount);
        this.updateForm = this.formBuilder.group({
          name: [this.selectedAccount.name, null],
          username: [this.selectedAccount.username, null],
          email: [this.selectedAccount.email, null],
          password: ['', null],
        });
      }
    });

    this.store.select(selectSettings).subscribe((state: ISettingsState) =>{
      if(state && state.settings){
        this.settings = _.cloneDeep(state.settings);
        this.settingsForm = this.formBuilder.group({
          minReadTime: [this.settings.min_read_time, null],
        });
      }
    });
  }

  onUpdateAccount(){

  }

  onUpdateGameSettings(){
    let settings = new Settings();
    settings.min_read_time = this.settingsForm.controls['minReadTime'].value;
    settings.account_id = this.settings.account_id;
    settings.id = this.settings.id;
    this.store.dispatch(new SetSettingsAction(settings));
  }

  onChangeMinReading(minReadingTime:string){
    this.settingsForm.controls['minReadTime'].setValue(minReadingTime) ;
  }

  ngOnDestroy(): void {
    this.store.dispatch( new ClearNotificationMessage());
  }

}
