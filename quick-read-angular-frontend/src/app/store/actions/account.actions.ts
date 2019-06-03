import { Action } from '@ngrx/store';
import {qrAccount} from "../../models/Account";
import {HttpErrorResponse} from "@angular/common/http";
import {AccountDTO} from "../../models/AccountDTO";

export enum EProfileAction {
  GetAccounts = '[Account Component] Get Accounts',
  GetAccountsSuccess = '[Account Component] Get Accounts Success',
  UpdateAccount = '[Account Component] Update account',
  UpdateAccountSuccess = '[Account Component] Update account success',
  UpdateAccountError = '[Account Component] Update account error',
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
  ClearSelectedAccount = '[Account Component] Clear selected account',
  ClearAccountMessages = '[Account Component] Clear status messages',
}

export class ClearAccountMessagesAction implements Action {
  readonly type = EProfileAction.ClearAccountMessages;
}

export class UpdateAccountSuccessAction implements Action {
  readonly type = EProfileAction.UpdateAccountSuccess;
  constructor(public payload: qrAccount){
  }
}

export class UpdateAccountErrorAction implements Action {
  readonly type = EProfileAction.UpdateAccountError;
  constructor(public payload: AccountDTO){
  }
}

export class UpdateAccountAction implements Action {
  readonly type = EProfileAction.UpdateAccount;
  constructor(public payload: qrAccount){
  }
}

export class ClearSelectedAccountAction implements Action {
  readonly type = EProfileAction.ClearSelectedAccount;
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
  constructor(public payload: AccountDTO[]){
  }
}

export class CreateAccountSuccess implements Action {
  public readonly type = EProfileAction.CreateAccountSuccess;
  constructor(public payload: AccountDTO){
  }
}

export class CreateAccountError implements Action {
  public readonly type = EProfileAction.CreateAccountError;
  constructor(public payload: HttpErrorResponse){
  }
}

export class CreateAccountAction implements Action {
  public readonly type = EProfileAction.CreateAccount;
  constructor(public payload: qrAccount){
  }
}

export type ProfileAction = GetAccounts | GetAccountsSuccess | CreateAccountAction | CreateAccountSuccess
  |CreateAccountError | ClearAccountNotifications | AddAccountInterests | AddAccountProfilePicture
  | AccountLoginAction | AccountLoginSuccessAction | AccountLoginErrorAction | ClearSelectedAccountAction
  | UpdateAccountAction | UpdateAccountErrorAction | UpdateAccountSuccessAction | ClearAccountMessagesAction;
