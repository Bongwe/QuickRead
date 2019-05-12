import {IAppState} from "../state/app.state";

export const selectAccounts = (state: IAppState) => state.accounts;

/*
export const selectAccountList = createSelector(
  selectAccounts,
  (state: IAccountState) => state.allAccounts
);
*/
