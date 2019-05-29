import {IAccountState, initialAccountState} from "../reducers/profile.reducer";
import {initialBookState, ISuggestedBookState} from "../reducers/suggested-books.reducer";
import {initialNotificationState, INotification} from "../reducers/notifications.reducer";
import {IBookShelfState, initialBookShelfState} from "../reducers/book-shelf.reducer";

export interface IAppState {
  accounts?: IAccountState;
  books?: ISuggestedBookState;
  notifications?: INotification;
  bookShelf?: IBookShelfState;
};

const initialAppState: IAppState = {
  accounts: initialAccountState,
  books: initialBookState,
  notifications: initialNotificationState,
  bookShelf: initialBookShelfState
};

