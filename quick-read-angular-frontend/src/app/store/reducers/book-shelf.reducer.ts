import * as _ from 'lodash';
import {
  AddToBookShelfAction, AddToBookShelfErrorAction,
  AddToBookShelfSuccessAction,
  BookShelfAction,
  EBooksShelfAction, GetBooksInBookshelfSuccessAction,
} from "../actions/book-shelf.actions";
import {Book} from "../../models/Book";
import {BookShelf} from "../../models/BookShelf";

export interface IBookShelfState {
  bookShelf: Array<BookShelf>;
  booksInAccount: Array<Book>;
}

export const initialBookShelfState: IBookShelfState = null;

export function bookShelfReducer (state = initialBookShelfState, action: BookShelfAction): IBookShelfState {
  switch (action.type) {
    case EBooksShelfAction.AddToBookShelf:
      return addToBookShelf(state, action);
    case EBooksShelfAction.AddToBookShelfSuccess:
      return addToBookShelfSuccess(state, action);
    case EBooksShelfAction.BookShelfError:
      return addToBookShelfError(state, action);
    case EBooksShelfAction.GetBooksInBookShelfSuccess:
      return getBooksInBookshelf(state, action);
    default:
      return state;
  }
};

function getBooksInBookshelf(state: IBookShelfState, action: GetBooksInBookshelfSuccessAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  for(let book of action.payload){
    newState.booksInAccount.push(book);
  }
  return newState;
}

function addToBookShelf(state: IBookShelfState, action: AddToBookShelfAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
    newState.bookShelf.push(action.payload);
  return newState;
}

function addToBookShelfSuccess(state: IBookShelfState, action: AddToBookShelfSuccessAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  //newState.bookShelf.push(action.payload);
  return newState;
}

function addToBookShelfError(state: IBookShelfState, action: AddToBookShelfErrorAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  //newState.bookShelf.push(action.payload);
  return newState;
}

function createEmptyState() {
  return {
    bookShelf: new Array<BookShelf>(),
    booksInAccount: new Array<Book>()
  };
}
