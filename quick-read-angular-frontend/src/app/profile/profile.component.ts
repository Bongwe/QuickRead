import { Component, OnInit } from '@angular/core';
import {IAccountState} from "../store/reducers/profile.reducer";
import {select, Store} from "@ngrx/store";
import {getInitialState} from "../store/state/app.state";
import {ProfileEffects} from "../store/effects/profile.effect";
import {GetAccounts} from "../store/actions/profile.actions";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 accounts$ = this.store.pipe(select(getInitialState));
  name = '666';
  age = 666;

  constructor(private store: Store<IAccountState>) { }

  ngOnInit() {
    this.store.dispatch(new GetAccounts())
    this.accounts$.subscribe((something) => {
      console.log(something);
    })
  }

}
