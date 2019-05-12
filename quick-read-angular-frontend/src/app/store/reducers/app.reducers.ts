import {ActionReducerMap} from "@ngrx/store";
import {IAppState} from "../state/app.state";
import {profileReducer} from "./profile.reducer";

export const appReducers: ActionReducerMap<IAppState, any> = {
  accounts: profileReducer
};
