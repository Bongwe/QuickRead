import * as _ from 'lodash';
import {
  AddToBookShelfAction, AddToBookShelfErrorAction,
  AddToBookShelfSuccessAction,
  BookShelfAction,
  EBooksShelfAction, GetBooksInBookshelfSuccessAction, ReadBookSErrorAction, ReadBookSuccessAction,
} from "../actions/book-shelf.actions";
import {Book} from "../../models/Book";
import {BookShelf} from "../../models/BookShelf";
import {BookSection} from "../../models/BookSection";

export interface IBookShelfState {
  bookShelf: Array<BookShelf>;
  booksInAccount: Array<Book>;
  bookSections: Array<BookSection>;
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
    case EBooksShelfAction.ReadBookSuccess:
      return readBookSuccess(state, action);
    case EBooksShelfAction.ReadBookError:
      return readBookError(state, action);
    default:
      return state;
  }
};

function readBookSuccess(state: IBookShelfState, action: ReadBookSuccessAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.bookSections = action.payload;
  return newState;
}

function readBookError(state: IBookShelfState, action: ReadBookSErrorAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  return newState;
}

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
    booksInAccount: new Array<Book>(),
    bookSections: null
  };
}
