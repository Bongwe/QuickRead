import {IAppState} from "../state/app.state";
import {createSelector} from "@ngrx/store";
import {IAccountState} from "../reducers/profile.reducer";

export const selectAccounts = (state: IAppState) => state.accounts;
export const selectNotifications = (state: IAppState) => state.notifications;
/*
export const selectAccountErrors = createSelector(
  selectAccounts,
  (state: IAccountState) => state.accountError
);
*/
