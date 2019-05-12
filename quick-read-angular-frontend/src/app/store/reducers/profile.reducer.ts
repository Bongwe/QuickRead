import {EProfileAction, GetAccountsSuccess, ProfileAction} from "../actions/profile.actions";
import {myAccount} from "../../models/Account";

export interface IAccountState {
  allAccounts: Array<myAccount>;
  selectedAccount: myAccount
}

export const initialAccountState: IAccountState = null;

export const profileReducer = (state = initialAccountState, action: ProfileAction): IAccountState => {
  switch (action.type) {
    case EProfileAction.GetAccountsSuccess:
      return getAccounts(state, action);
    default:
      return state;
  }
};

function getAccounts(state: IAccountState, action: GetAccountsSuccess) {
  if(state == null) {
    state = {
      allAccounts:  new Array<myAccount>(),
      selectedAccount: new myAccount()
    };
  }
  state.allAccounts = action.payload;
  return state;
}
