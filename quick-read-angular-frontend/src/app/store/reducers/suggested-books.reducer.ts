import * as _ from 'lodash';
import {Book} from "../../models/Book";
import {
  ESuggestedBooksAction,
  GetAllSuggestedBooksSuccessAction, SuggestedBookAction
} from "../actions/suggested-books.actions";

export interface ISuggestedBookState {
  allBooks: Array<Book>;
}

export const initialBookState: ISuggestedBookState = null;

export function suggestedBooksReducer (state = initialBookState, action: SuggestedBookAction): ISuggestedBookState {
  switch (action.type) {
    case ESuggestedBooksAction.GetAllSuggestedBooksSuccess:
      return getBooks(state, action);
    default:
      return state;
  }
};

function getBooks(state: ISuggestedBookState, action: GetAllSuggestedBooksSuccessAction) {
  if(state == null) {
    state = {
      allBooks:  new Array<Book>(),
    };
  }
  let newState = _.cloneDeep(state);
  newState.allBooks = action.payload;
  return newState;
}

