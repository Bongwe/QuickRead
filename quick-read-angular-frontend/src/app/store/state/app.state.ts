import {IAccountState, initialAccountState} from "../reducers/profile.reducer";
import {initialBookState, ISuggestedBookState} from "../reducers/suggested-books.reducer";
import {initialNotificationState, INotification} from "../reducers/notifications.reducer";
import {IBookShelfState, initialBookShelfState} from "../reducers/book-shelf.reducer";
import {initialSectionState, ISectionState} from "../reducers/section.reducer";
import {initialSettingsState, ISettingsState} from "../reducers/settings.reducer";

export interface IAppState {
  accounts?: IAccountState;
  books?: ISuggestedBookState;
  notifications?: INotification;
  bookShelf?: IBookShelfState;
  currentSection?: ISectionState;
  settings?: ISettingsState;
};

const initialAppState: IAppState = {
  accounts: initialAccountState,
  books: initialBookState,
  notifications: initialNotificationState,
  bookShelf: initialBookShelfState,
  currentSection: initialSectionState,
  settings: initialSettingsState
};

