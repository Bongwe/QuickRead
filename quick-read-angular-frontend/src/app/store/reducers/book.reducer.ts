
import * as _ from 'lodash';
import {Book} from "../../models/Book";
import {BookAction, EBookAction, GetAllBooksSuccess} from "../actions/book.actions";

export interface IBookState {
  allBooks: Array<Book>;
}

export const initialBookState: IBookState = null;

export function bookReducer (state = initialBookState, action: BookAction): IBookState {
  switch (action.type) {
    case EBookAction.GetAllBooksSuccess:
      return getBooks(state, action);
    default:
      return state;
  }
};

function getBooks(state: IBookState, action: GetAllBooksSuccess) {
  if(state == null) {
    state = {
      allBooks:  new Array<Book>(),
    };
  }
  let newState = _.cloneDeep(state);
  newState.allBooks = action.payload;
  return newState;
}
