import {myAccount} from "../../models/Account";
import {EProfileAction, GetAccountsSuccess, ProfileAction} from "../actions/profile.actions";

export interface IAccountState {
  accounts: Array<myAccount>;
  selectedAccount: myAccount
}

export const initialAccountState: IAccountState = {
  accounts: null,
  selectedAccount: null
};

export const profileReducer = (state = initialAccountState, action: ProfileAction): IAccountState => {
  switch (action.type) {
    case EProfileAction.GetAccountsSuccess:
      return getAccounts(state, action)
     /* return {
        ...state,
        accounts: action.payload
      };*/
    default:
      return state;
  }
};

function getAccounts(state: IAccountState, action: GetAccountsSuccess) {
  state.accounts = action.payload;
  return state;
}
