import * as _ from 'lodash';
import {
  AddToBookShelfAction, AddToBookShelfErrorAction,
  AddToBookShelfSuccessAction,
  BookShelfAction,
  EBooksShelfAction
} from "../actions/book-shelf.actions";
import {BookShelf} from "../../models/BookShelf";

export interface IBookShelfState {
  bookShelf: Array<BookShelf>;
}

export const initialBookShelfState: IBookShelfState = null;

export function bookShelfReducer (state = initialBookShelfState, action: BookShelfAction): IBookShelfState {
  switch (action.type) {
    case EBooksShelfAction.AddToBookShelf:
      return addToBookShelf(state, action);
    case EBooksShelfAction.AddToBookShelfSuccess:
      return addToBookShelfSuccess(state, action);
    case EBooksShelfAction.AddToBookShelfError:
      return addToBookShelfError(state, action);
    default:
      return state;
  }
};

function addToBookShelf(state: IBookShelfState, action: AddToBookShelfAction) {
  if(state == null) {
    state = {
      bookShelf:  new Array<BookShelf>(),
    };
  }
  let newState = _.cloneDeep(state);
  newState.bookShelf.push(action.payload);
  return newState;
}

function addToBookShelfSuccess(state: IBookShelfState, action: AddToBookShelfSuccessAction) {
  if(state == null) {
    state = {
      bookShelf:  new Array<BookShelf>(),
    };
  }
  let newState = _.cloneDeep(state);
  //newState.bookShelf.push(action.payload);
  return newState;
}

function addToBookShelfError(state: IBookShelfState, action: AddToBookShelfErrorAction) {
  if(state == null) {
    state = {
      bookShelf:  new Array<BookShelf>(),
    };
  }
  let newState = _.cloneDeep(state);
  //newState.bookShelf.push(action.payload);
  return newState;
}
