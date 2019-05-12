import {ActionReducerMap} from "@ngrx/store";
import {IAppState} from "./store/state/app.state";
import {profileReducer} from "./store/reducers/profile.reducer";

export const appReducers: ActionReducerMap<IAppState, any> = {
  accounts: profileReducer
};
