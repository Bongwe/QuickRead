import { Action } from '@ngrx/store';
import {qrAccount} from "../../models/Account";
import {HttpErrorResponse} from "@angular/common/http";

export enum EProfileAction {
  GetAccounts = '[Account Component] Get Accounts',
  GetAccountsSuccess = '[Account Component] Get Accounts Success',
  GetAccountsError = '[Account Component] Get Accounts Error',
  CreateAccount = '[Account Component] Create Account',
  CreateAccountSuccess = '[Account Component] Create Account Success ',
  CreateAccountError = '[Account Component] Create Account Error ',
  ClearAccountNotifications = '[Account Component] Clear Account Notifications',
  AddAccountInterests = '[Account Component] Add Account Interests',
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
  |CreateAccountError | ClearAccountNotifications | AddAccountInterests;
