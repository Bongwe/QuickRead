import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {CreateAccount} from "../../store/actions/account.actions";
import {qrAccount} from "../../models/Account";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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
  registerForm: FormGroup;
  forSubmitted: boolean = false;

  constructor(private store: Store<IAppState>, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public onSubmit() {
    let newAccount = new qrAccount();

    this.forSubmitted = true;
    if(this.registerForm.valid){
      newAccount.name = this.registerForm.controls['name'].value;
      newAccount.username = this.registerForm.controls['username'].value;
      newAccount.email = this.registerForm.controls['email'].value;
      newAccount.password = this.registerForm.controls['password'].value;
      console.log(newAccount);
      this.store.dispatch(new CreateAccount(newAccount));
    }
  }

}
