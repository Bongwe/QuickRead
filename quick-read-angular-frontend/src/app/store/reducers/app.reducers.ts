import {ActionReducerMap} from "@ngrx/store";
import {IAppState} from "../state/app.state";
import {accountReducer} from "./account.reducer";
import {suggestedBooksReducer} from "./suggested-books.reducer";
import {notificationReducer} from "./notifications.reducer";
import {bookShelfReducer} from "./book-shelf.reducer";
import {sectionReducer} from "./section.reducer";
import {settingsReducer} from "./settings.reducer";
import {gameStateReducer} from "./gameState.reducer";

export const appReducers: ActionReducerMap<IAppState, any> = {
  accounts: accountReducer,
  books: suggestedBooksReducer,
  notifications: notificationReducer,
  bookShelf: bookShelfReducer,
  currentSection: sectionReducer,
  settings: settingsReducer,
  gameState: gameStateReducer
};
