import { Action } from '@ngrx/store';
import {qrAccount} from "../../models/Account";
import {HttpErrorResponse} from "@angular/common/http";

export enum EProfileAction {
  GetAccounts = '[Acc\ount Component] Get Accounts',
  GetAccountsSuccess = '[Account Component] Get Accounts Success',
  GetAccountsError = '[Account Component] Get Accounts Error',
  CreateAccount = '[Account Component] Create Account',
  CreateAccountSuccess = '[Account Component] Create Account Success ',
  CreateAccountError = '[Account Component] Create Account Error ',
  ClearAccountNotifications = '[Account Component] Clear Account Notifications',
  AddAccountInterests = '[Account Component] Add Account Interests',
  AddAccountProfilePicture = '[Account Component] Add Account Profile Picture',
  AccountLogin = '[Account Component] Account Login',
  AccountLoginSuccess = '[Account Component] Account Login Success',
  AccountLoginError = '[Account Component] Account Login Error',
}

export class AccountLoginAction implements Action {
  readonly type = EProfileAction.AccountLogin;
  constructor(public payload: qrAccount){
  }
}

export class AccountLoginSuccessAction implements Action {
  readonly type = EProfileAction.AccountLoginSuccess;
  constructor(public payload: qrAccount){
  }
}

export class AccountLoginErrorAction implements Action {
  readonly type = EProfileAction.AccountLoginError;
  constructor(public payload: HttpErrorResponse){
  }
}

export class AddAccountProfilePicture implements Action {
  readonly type = EProfileAction.AddAccountProfilePicture;
  constructor(public payload: string){
  }
}

export class AddAccountInterests implements Action {
  readonly type = EProfileAction.AddAccountInterests;
  constructor(public payload: string){
  }
}

export class ClearAccountNotifications implements Action {
  readonly type = EProfileAction.ClearAccountNotifications;
}

export class GetAccounts implements Action {
  readonly type = EProfileAction.GetAccounts;
}

export class GetAccountsSuccess implements Action {
  public readonly type = EProfileAction.GetAccountsSuccess;
  constructor(public payload: qrAccount[]){
  }
}

export class CreateAccountSuccess implements Action {
  public readonly type = EProfileAction.CreateAccountSuccess;
  constructor(public payload: qrAccount){
  }
}

export class CreateAccountError implements Action {
  public readonly type = EProfileAction.CreateAccountError;
  constructor(public payload: HttpErrorResponse){
  }
}

export class CreateAccount implements Action {
  public readonly type = EProfileAction.CreateAccount;
  constructor(public payload: qrAccount){
  }
}

export type ProfileAction = GetAccounts | GetAccountsSuccess | CreateAccount | CreateAccountSuccess
  |CreateAccountError | ClearAccountNotifications | AddAccountInterests | AddAccountProfilePicture
  | AccountLoginAction | AccountLoginSuccessAction | AccountLoginErrorAction;
