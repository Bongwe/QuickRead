import {Component, OnInit} from '@angular/core';
import {GetAccounts} from "./store/actions/account.actions";
import {Store} from "@ngrx/store";
import {IAppState} from "./store/state/app.state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.store.dispatch(new GetAccounts());
  }

}
