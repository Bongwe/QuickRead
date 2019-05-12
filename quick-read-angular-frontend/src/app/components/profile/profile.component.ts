import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {selectAccounts} from "../../store/selectors/profile.selectors";
import {IAccountState} from "../../store/reducers/profile.reducer";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
     /*this.store.select(selectAccountList).subscribe((account: Array<myAccount>) =>{
       console.log(account);
     });*/
    this.store.select(selectAccounts).subscribe((account: IAccountState) =>{
      if(account){
        console.log(account.allAccounts);
      }
    });
  }
}
