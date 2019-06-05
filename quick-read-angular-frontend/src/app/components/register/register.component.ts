import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {CreateAccountAction} from "../../store/actions/account.actions";
import {qrAccount} from "../../models/Account";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {selectAccounts} from "../../store/selectors/profile.selectors";
import {IAccountState} from "../../store/reducers/account.reducer";
import * as sha512 from "js-sha512";
import {ClearNotificationMessageAction} from "../../store/actions/notofication.actions";
import {GetAllSuggestedBooksAction} from "../../store/actions/suggested-books.actions";

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

  selectedInterestsDisable: boolean = true;

  constructor(private store: Store<IAppState>,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new GetAllSuggestedBooksAction());
    this.store.select(selectAccounts).subscribe((state: IAccountState) =>{
      if(state && state.selectedAccount !== null){
        this.selectedInterestsDisable = false;
        if(this.registerForm){
          this.registerForm.reset();
        }
      }
    });

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
      newAccount.password = sha512.sha512(this.registerForm.controls['password'].value);
      this.store.dispatch(new CreateAccountAction(newAccount));
    }
  }

  public nextPage(){
    this.store.dispatch( new ClearNotificationMessageAction());
    this.router.navigate(['/interests']);
  }

}
