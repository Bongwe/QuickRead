import { Action } from '@ngrx/store';
import {qrAccount} from "../../models/Account";

export enum EProfileAction {
  GetAccounts = '[Account Component] Get Accounts',
  GetAccountsSuccess = '[Account Component] Get Accounts Success',
  GetAccountsError = '[Account Component] Get Accounts Error',
  CreateAccount = '[Account Component] Create Account',
}

export class GetAccounts implements Action {
  readonly type = EProfileAction.GetAccounts;
}

export class GetAccountsSuccess implements Action {
  public readonly type = EProfileAction.GetAccountsSuccess;
  constructor(public payload: qrAccount[]){
  }
}

export class CreateAccount implements Action {
  public readonly type = EProfileAction.CreateAccount;
  constructor(public payload: qrAccount){
  }
}

export type ProfileAction = GetAccounts | GetAccountsSuccess | CreateAccount;
