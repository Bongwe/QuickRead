import {IAccountState, initialAccountState} from "../reducers/profile.reducer";
import {IBookState, initialBookState} from "../reducers/book.reducer";

export interface IAppState {
  accounts?: IAccountState;
  books?: IBookState;
};

const initialAppState: IAppState = {
  accounts: initialAccountState,
  books: initialBookState
};

