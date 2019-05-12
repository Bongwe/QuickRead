import {IAccountState, initialAccountState} from "../reducers/profile.reducer";

export interface IAppState {
  accounts?: IAccountState;
};

const initialAppState: IAppState = {
  accounts: initialAccountState
};

