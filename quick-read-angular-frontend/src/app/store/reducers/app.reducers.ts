import {ActionReducerMap} from "@ngrx/store";
import {IAppState} from "../state/app.state";
import {profileReducer} from "./profile.reducer";
import {bookReducer} from "./book.reducer";

export const appReducers: ActionReducerMap<IAppState, any> = {
  accounts: profileReducer,
  books: bookReducer
};
