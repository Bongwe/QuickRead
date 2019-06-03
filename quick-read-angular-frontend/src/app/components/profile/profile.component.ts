import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {selectAccounts} from "../../store/selectors/profile.selectors";
import {IAccountState} from "../../store/reducers/profile.reducer";
import {qrAccount} from "../../models/Account";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import * as _ from 'lodash';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private selectedAccount: qrAccount;
  public updateForm: FormGroup;
  public settingsForm: FormGroup;

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

   /* this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', null],
      email: ['', null],
      password: ['', null],
    });*/

    this.settingsForm = this.formBuilder.group({
      minReadTime: ['', null],
    });

  }

  onUpdateAccount(){

  }

  onUpdateGameSettings(){

  }

}
