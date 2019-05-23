import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {selectAccounts} from "../../store/selectors/profile.selectors";
import {IAccountState} from "../../store/reducers/profile.reducer";
import {qrAccount} from "../../models/Account";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  accounts: qrAccount[];

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.store.select(selectAccounts).subscribe((account: IAccountState) =>{
      if(account){
        this.accounts = account.allAccounts;
      }
    });
  }

  updateProfile(){

  }

}
