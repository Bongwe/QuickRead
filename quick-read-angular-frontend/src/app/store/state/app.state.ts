import {IAccountState, initialAccountState} from "../reducers/account.reducer";
import {initialBookState, ISuggestedBookState} from "../reducers/suggested-books.reducer";
import {initialNotificationState, INotification} from "../reducers/notifications.reducer";
import {IBookShelfState, initialBookShelfState} from "../reducers/book-shelf.reducer";
import {initialSectionState, ISectionState} from "../reducers/section.reducer";
import {initialSettingsState, ISettingsState} from "../reducers/settings.reducer";
import {gameStateReducer, IGameState, initialGameState} from "../reducers/gameState.reducer";

export interface IAppState {
  accounts?: IAccountState;
  books?: ISuggestedBookState;
  notifications?: INotification;
  bookShelf?: IBookShelfState;
  currentSection?: ISectionState;
  settings?: ISettingsState;
  gameState?: IGameState
};

const initialAppState: IAppState = {
  accounts: initialAccountState,
  books: initialBookState,
  notifications: initialNotificationState,
  bookShelf: initialBookShelfState,
  currentSection: initialSectionState,
  settings: initialSettingsState,
  gameState: initialGameState
};

