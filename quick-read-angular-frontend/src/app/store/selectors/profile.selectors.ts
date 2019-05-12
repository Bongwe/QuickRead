import {IAccountState} from "../reducers/profile.reducer";
import {createSelector} from "@ngrx/store";
import {myAccount} from "../../models/Account";

const selectAccounts = (state: IAccountState) => state.accounts;

export const selectAccountList = createSelector(
  selectAccounts,
  (state: Array<myAccount>) => state
);
