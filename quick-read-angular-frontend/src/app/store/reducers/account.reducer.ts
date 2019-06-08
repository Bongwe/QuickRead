import {qrAccount} from "../../models/Account";
import * as _ from 'lodash';
import {
  AccountLoginAction, AccountLoginErrorAction, AccountLoginSuccessAction,
  AddAccountInterests, AddAccountProfilePicture, ClearSelectedAccountAction,
  CreateAccountError,
  CreateAccountSuccess,
  EProfileAction,
  GetAccountsSuccess,
  ProfileAction, UpdateAccountErrorAction, UpdateAccountSuccessAction
} from "../actions/account.actions";
import {AccountDTO} from "../../models/dto/AccountDTO";
import {SetNotificationMessageAction} from "../actions/notofication.actions";
import {NotificationObj} from "../../models/NotificationObj";

export interface IAccountState {
  allAccounts: Array<AccountDTO>;
  selectedAccount: qrAccount,
  interests: string
  profilePicture: string
}

export const initialAccountState: IAccountState = null;

export function accountReducer (state = initialAccountState, action: ProfileAction): IAccountState {
  switch (action.type) {
    case EProfileAction.GetAccountsSuccess:
      return getAccounts(state, action);
    case EProfileAction.CreateAccountSuccess:
      return createAccount(state, action);
    case EProfileAction.UpdateAccountSuccess:
      return updateAccountSuccess(state, action);
    case EProfileAction.UpdateAccountError:
      return updateAccountError(state, action);
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
    case EProfileAction.ClearAccount:
      return clearAccount(state, action);
    default:
      return state;
  }
};

function updateAccountSuccess(state: IAccountState, action: UpdateAccountSuccessAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.selectedAccount = action.payload;
  return newState;
}

function updateAccountError(state: IAccountState, action: UpdateAccountErrorAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
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
  return newState;
}

function createAccountError(state: IAccountState, action: CreateAccountError) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  if (action.payload.status !== 409) {
    this.store.dispatch(new SetNotificationMessageAction(new NotificationObj(action.payload.message)));
  }
  /*if (action.payload.status === 409) {
    this.store.dispatch(new SetNotificationMessageAction(new NotificationObj('It looks like your email address already exists', true)));
  } else {
    this.store.dispatch(new SetNotificationMessageAction(new NotificationObj(action.payload.message)));
  }*/
  return newState;
}

function accountLogin(state: IAccountState, action: AccountLoginAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  return newState;
}

function accountLoginSuccess(state: IAccountState, action: AccountLoginSuccessAction) {
    if(state == null) {
      state = createEmptyState();
    }
    let newState = _.cloneDeep(state);
    /*this.store.dispatch(new SetNotificationMessageAction(new NotificationObj('Successful login', true)));*/
    newState.selectedAccount = action.payload;
    return newState;
}

function accountLoginError(state: IAccountState, action: AccountLoginErrorAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  if (action.payload.status !== 400) {
    this.store.dispatch(new SetNotificationMessageAction(new NotificationObj(action.payload.message, false, true)));

  }
  /*if (action.payload.status === 400) {
    this.store.dispatch(new SetNotificationMessageAction(new NotificationObj('Invalid email or password', false, true)));
  } else {
    this.store.dispatch(new SetNotificationMessageAction(new NotificationObj(action.payload.message, false, true)));
  }*/
  return newState;
}

function clearAccount(state: IAccountState, action: ClearSelectedAccountAction) {
  return null;
}

function createEmptyState() {
  return {
    allAccounts:  new Array<AccountDTO>(),
    selectedAccount: null,
    interests: null,
    profilePicture: null
  };
}
