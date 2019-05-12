import {qrAccount} from "../../models/Account";

import * as _ from 'lodash';
import {EProfileAction, GetAccountsSuccess, ProfileAction} from "../actions/account.actions";

export interface IAccountState {
  allAccounts: Array<qrAccount>;
  selectedAccount: qrAccount
}

export const initialAccountState: IAccountState = null;

export const profileReducer = (state = initialAccountState, action: ProfileAction): IAccountState => {
  switch (action.type) {
    case EProfileAction.GetAccountsSuccess:
      return getAccounts(state, action);
    /*case EProfileAction.CreateProfile:
      return createProfile(state, action);*/
    default:
      return state;
  }
};

function getAccounts(state: IAccountState, action: GetAccountsSuccess) {
  if(state == null) {
    state = {
      allAccounts:  new Array<qrAccount>(),
      selectedAccount: new qrAccount()
    };
  }
  let newState = _.cloneDeep(state);
  newState.allAccounts = action.payload;
  return newState;
}

/*function createProfile(state: IAccountState, action: CreateProfile) {
  if(state == null) {
    state = {
      allAccounts:  new Array<qrAccount>(),
      selectedAccount: new qrAccount()
    };
  }
  let newState = _.cloneDeep(state);
  newState.allAccounts = action.payload;
  return newState;
}*/
