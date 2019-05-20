import {qrAccount} from "../../models/Account";

import * as _ from 'lodash';
import {
  CreateAccountError,
  CreateAccountSuccess,
  EProfileAction,
  GetAccountsSuccess,
  ProfileAction
} from "../actions/account.actions";

export interface IAccountState {
  allAccounts: Array<qrAccount>;
  selectedAccount: qrAccount,
  accountError: string
}

export const initialAccountState: IAccountState = null;

export function profileReducer (state = initialAccountState, action: ProfileAction): IAccountState {
  switch (action.type) {
    case EProfileAction.GetAccountsSuccess:
      return getAccounts(state, action);
    case EProfileAction.CreateAccountSuccess:
      return createAccount(state, action);
    case EProfileAction.CreateAccountError:
      return createAccountError(state, action);
    default:
      return state;
  }
};

function getAccounts(state: IAccountState, action: GetAccountsSuccess) {
  if(state == null) {
    state = {
      allAccounts:  new Array<qrAccount>(),
      selectedAccount: new qrAccount(),
      accountError: String()
    };
  }
  let newState = _.cloneDeep(state);
  newState.allAccounts = action.payload;
  return newState;
}

function createAccount(state: IAccountState, action: CreateAccountSuccess) {
  if(state == null) {
    state = {
      allAccounts:  new Array<qrAccount>(),
      selectedAccount: new qrAccount(),
      accountError: String()
    };
  }
  let newState = _.cloneDeep(state);
  newState.selectedAccount = action.payload;
  return newState;
}

function createAccountError(state: IAccountState, action: CreateAccountError) {
  if(state == null) {
    state = {
      allAccounts:  new Array<qrAccount>(),
      selectedAccount: new qrAccount(),
      accountError: String()
    };
  }
  let newState = _.cloneDeep(state);
  if (action.payload.status == 208) {
    newState.accountError = 'It looks like your email address already exists';
  } else {
    newState.accountError = action.payload.message;
  }
  return newState;
}
