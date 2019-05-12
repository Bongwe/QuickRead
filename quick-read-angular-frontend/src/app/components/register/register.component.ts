import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {CreateAccount} from "../../store/actions/account.actions";
import {qrAccount} from "../../models/Account";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string;
  username: string;
  email: string;
  password: string;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
  }

  public onChangeName(value: string){
   this.name = value;
  }

  public onChangeUsername(value: string){
    this.username = value;
  }

  public onChangeEmail(value: string){
    this.email = value;
  }

  public onChangePassword(value: string){
    this.password = value;
  }

  public onSubmit() {
    let newAccount = new qrAccount();
    newAccount.name = this.name;
    newAccount.username = this.username;
    newAccount.email = this.email;
    newAccount.password = this.password;

    this.store.dispatch(new CreateAccount(newAccount));
  }

}
