import {IAccountState, initialAccountState} from "../reducers/profile.reducer";

export interface IAppState {
  accounts: IAccountState;
};

export const initialAppState: IAppState = {
  accounts: initialAccountState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
