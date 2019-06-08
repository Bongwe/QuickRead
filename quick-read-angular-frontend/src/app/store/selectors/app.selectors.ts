import {IAppState} from "../state/app.state";

export const selectAccounts = (state: IAppState) => state.accounts;
export const selectBookShelf = (state: IAppState) => state.bookShelf;
export const selectNotifications = (state: IAppState) => state.notifications;
export const selectSection = (state: IAppState) => state.currentSection;
export const selectSettings = (state: IAppState) => state.settings;
export const selectGameState = (state: IAppState) => state.gameState;
/*
export const selectAccountErrors = createSelector(
  selectAccounts,
  (state: IAccountState) => state.accountErrorMessage
);
*/
