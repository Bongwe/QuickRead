import {qrAccount} from "../../models/Account";
import * as _ from 'lodash';
import {
  AccountLoginAction, AccountLoginErrorAction, AccountLoginSuccessAction,
  AddAccountInterests, AddAccountProfilePicture, ClearAccountMessagesAction,
  ClearAccountNotifications, ClearSelectedAccountAction,
  CreateAccountError,
  CreateAccountSuccess,
  EProfileAction,
  GetAccountsSuccess,
  ProfileAction, UpdateAccountErrorAction, UpdateAccountSuccessAction
} from "../actions/account.actions";
import {AccountDTO} from "../../models/AccountDTO";

export interface IAccountState {
  allAccounts: Array<AccountDTO>;
  selectedAccount: qrAccount,
  accountErrorMessage: string
  accountSuccessMessage: string
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
    case EProfileAction.UpdateAccountSuccess:
      return updateAccountSuccess(state, action);
    case EProfileAction.UpdateAccountError:
      return updateAccountError(state, action);
    case EProfileAction.ClearAccountNotifications:
      return clearNotifications(state, action);
    case EProfileAction.AddAccountInterests:
      return addAccountInterest(state, action);
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
    case EProfileAction.ClearSelectedAccount:
      return clearSelectedAccount(state, action);
    case EProfileAction.ClearAccountMessages:
      return clearAccountMessages(state, action);
    default:
      return state;
  }
};

function clearAccountMessages(state: IAccountState, action: ClearAccountMessagesAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.accountSuccessMessage = null;
  newState.accountErrorMessage = null;
  return newState;
}

function updateAccountSuccess(state: IAccountState, action: UpdateAccountSuccessAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.selectedAccount = action.payload;
  newState.accountSuccessMessage = "Account updated successfully";
  return newState;
}

function updateAccountError(state: IAccountState, action: UpdateAccountErrorAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.accountSuccessMessage = "Account updated error";
  return newState;
}

function addAccountProfilePicture(state: IAccountState, action: AddAccountProfilePicture) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.profilePicture = action.payload;
  return newState;
}

function addAccountInterest(state: IAccountState, action: AddAccountInterests) {
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
  newState.accountSuccessMessage = null;
  newState.accountErrorMessage = null;
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
  newState.selectedAccount = action.payload.account;
  newState.accountSuccessMessage = "Account created successfully";
  newState.accountErrorMessage = null;
  return newState;
}

function createAccountError(state: IAccountState, action: CreateAccountError) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  if (action.payload.status === 409) {
    newState.accountErrorMessage = 'It looks like your email address already exists';
  } else {
    newState.accountErrorMessage = action.payload.message;
  }
  newState.accountSuccessMessage = null;
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
    newState.accountSuccessMessage = 'successful login';
    newState.selectedAccount = action.payload;
    return newState;
}

function accountLoginError(state: IAccountState, action: AccountLoginErrorAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  if (action.payload.status === 400) {
    newState.accountErrorMessage = 'Invalid email or password';
  } else {
    newState.accountErrorMessage = action.payload.message;
  }
  newState.accountSuccessMessage = null;
  return newState;
}

function clearSelectedAccount(state: IAccountState, action: ClearSelectedAccountAction) {
  if(state == null) {
    return state;
  }
  let newState = _.cloneDeep(state);
  newState.selectedAccount = null;
  newState.accountSuccessMessage = null;
  return newState;
}

function createEmptyState() {
  return {
    allAccounts:  new Array<AccountDTO>(),
    selectedAccount: null,
    accountErrorMessage: null,
    accountSuccessMessage: null,
    interests: null,
    profilePicture: null
  };
}
