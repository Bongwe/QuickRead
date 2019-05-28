import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {Router} from "@angular/router";
import {qrAccount} from "../../models/Account";
import * as sha512 from 'js-sha512';
import {AccountLoginAction, CreateAccount} from "../../store/actions/account.actions";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private store: Store<IAppState>,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', ],
      password: ['', ],
    });
  }

  public onSubmit() {
    let loginDetails = new qrAccount();
    if (this.loginForm.valid) {
      loginDetails.email = this.loginForm.controls['email'].value;
      loginDetails.password = sha512.sha512(this.loginForm.controls['password'].value);
      this.store.dispatch(new AccountLoginAction(loginDetails));
    }
  }

}
