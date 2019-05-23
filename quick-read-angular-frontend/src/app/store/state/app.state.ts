import {IAccountState, initialAccountState} from "../reducers/profile.reducer";
import {IBookState, initialBookState} from "../reducers/book.reducer";
import {initialNotificationState, INotification} from "../reducers/notifications.reducer";

export interface IAppState {
  accounts?: IAccountState;
  books?: IBookState;
  notifications?: INotification;
};

const initialAppState: IAppState = {
  accounts: initialAccountState,
  books: initialBookState,
  notifications: initialNotificationState
};

