import {ActionReducerMap} from "@ngrx/store";
import {IAppState} from "../state/app.state";
import {profileReducer} from "./profile.reducer";
import {suggestedBooksReducer} from "./suggested-books.reducer";
import {notificationReducer} from "./notifications.reducer";
import {bookShelfReducer} from "./book-shelf.reducer";

export const appReducers: ActionReducerMap<IAppState, any> = {
  accounts: profileReducer,
  books: suggestedBooksReducer,
  notifications: notificationReducer,
  bookShelf: bookShelfReducer
};
