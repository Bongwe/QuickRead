import { Action } from '@ngrx/store';
import {myAccount} from "../../models/Account";

export enum EProfileAction {
  GetAccounts = '[Profile Component] Get Accounts',
  GetAccountsSuccess = '[Profile Component] Get Accounts Success',
  GetAccountsError = '[Profile Component] Get Accounts Error',
}

export class GetAccounts implements Action {
  readonly type = EProfileAction.GetAccounts;
}

export class GetAccountsSuccess implements Action {
  public readonly type = EProfileAction.GetAccountsSuccess;
  constructor(public payload: myAccount[]){
  }
}

export type ProfileAction = GetAccounts | GetAccountsSuccess;
