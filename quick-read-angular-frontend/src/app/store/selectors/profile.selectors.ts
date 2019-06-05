import {IAppState} from "../state/app.state";
import {createSelector} from "@ngrx/store";
import {IAccountState} from "../reducers/account.reducer";

export const selectAccounts = (state: IAppState) => state.accounts;
export const selectBookShelf = (state: IAppState) => state.bookShelf;
export const selectNotifications = (state: IAppState) => state.notifications;
export const selectSection = (state: IAppState) => state.currentSection;
export const selectSettings = (state: IAppState) => state.settings;
/*
export const selectAccountErrors = createSelector(
  selectAccounts,
  (state: IAccountState) => state.accountErrorMessage
);
*/
