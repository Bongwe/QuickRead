import {qrAccount} from "../../models/Account";

import * as _ from 'lodash';
import {
  AccountLoginAction, AccountLoginErrorAction, AccountLoginSuccessAction,
  AddAccountInterests, AddAccountProfilePicture,
  ClearAccountNotifications,
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
  accountSuccess: string
  interests: string
  profilePicture: string
}

export const initialAccountState: IAccountState = null;

export function profileReducer (state = initialAccountState, action: ProfileAction): IAccountState {
  switch (action.type) {
    case EProfileAction.GetAccountsSuccess:
      return getAccounts(state, action);
    case EProfileAction.CreateAccountSuccess:
      return createAccount(state, action);
    case EProfileAction.ClearAccountNotifications:
      return clearNotifications(state, action);
    case EProfileAction.AddAccountInterests:
      return addAaccountInterest(state, action);
    case EProfileAction.AddAccountProfilePicture:
      return addAccountProfilePicture(state, action);
    case EProfileAction.CreateAccountError:
      return createAccountError(state, action);
    case EProfileAction.AccountLogin:
      return accountLogin(state, action);
    case EProfileAction.AccountLoginSuccess:
      return accountLoginSuccess(state, action);
    case EProfileAction.AccountLoginError:
      return accountLoginError(state, action);
    default:
      return state;
  }
};

function addAccountProfilePicture(state: IAccountState, action: AddAccountProfilePicture) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.profilePicture = action.payload;
  return newState;
}

function addAaccountInterest(state: IAccountState, action: AddAccountInterests) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.interests = action.payload;
  return newState;
}

function clearNotifications(state: IAccountState, action: ClearAccountNotifications) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.accountSuccess = null;
  newState.accountError = null;
  return newState;
}

function getAccounts(state: IAccountState, action: GetAccountsSuccess) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.allAccounts = action.payload;
  return newState;
}

function createAccount(state: IAccountState, action: CreateAccountSuccess) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.selectedAccount = action.payload;
  newState.accountSuccess = "Account created successfully";
  newState.accountError = null;
  return newState;
}

function createAccountError(state: IAccountState, action: CreateAccountError) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  if (action.payload.status === 409) {
    newState.accountError = 'It looks like your email address already exists';
  } else {
    newState.accountError = action.payload.message;
  }
  newState.accountSuccess = null;
  return newState;
}

function accountLogin(state: IAccountState, action: AccountLoginAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  //do some stsuff
  return newState;
}

function accountLoginSuccess(state: IAccountState, action: AccountLoginSuccessAction) {
    if(state == null) {
      state = createEmptyState();
    }
    let newState = _.cloneDeep(state);
    newState.selectedAccount = action.payload;
    return newState;
}

function accountLoginError(state: IAccountState, action: AccountLoginErrorAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  if (action.payload.status === 400) {
    newState.accountError = 'Invalid email or password';
  } else {
    newState.accountError = action.payload.message;
  }
  newState.accountSuccess = null;
  return newState;
}

function createEmptyState() {
  return {
    allAccounts:  new Array<qrAccount>(),
    selectedAccount: new qrAccount(),
    accountError: null,
    accountSuccess: null,
    interests: null,
    profilePicture: null
  };
}
