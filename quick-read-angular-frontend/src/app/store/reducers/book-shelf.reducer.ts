import * as _ from 'lodash';
import {
  AddToBookShelfAction,
  AddToBookShelfErrorAction,
  AddToBookShelfSuccessAction,
  BookShelfAction, ClearBookShelfAction, ClearSectionsAction,
  EBooksShelfAction,
  GetBooksInBookshelfSuccessAction,
  ReadBookSErrorAction,
  ReadBookSuccessAction,
  SetSelectedBookAction, UpdateSectionErrorAction, UpdateSectionSuccessAction,
} from "../actions/book-shelf.actions";
import {Book} from "../../models/Book";
import {BookShelf} from "../../models/BookShelf";
import {BookSection} from "../../models/BookSection";

export interface IBookShelfState {
  bookShelf: Array<BookShelf>;
  booksInAccount: Array<Book>;
  bookSections: Array<BookSection>;
  selectedBook: Book;
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
    case EBooksShelfAction.SetSelectedBook:
      return setSelectedBook(state, action);
    case EBooksShelfAction.UpdateSectionSuccess:
      return updateSectionSuccess(state, action);
    case EBooksShelfAction.UpdateSectionError:
      return updateSectionError(state, action);
    case EBooksShelfAction.ClearSections:
      return clearSections(state, action);
    case EBooksShelfAction.ClearBookShelf:
      return clearBookShelf(state, action);
    default:
      return state;
  }
};


function clearBookShelf(state: IBookShelfState, action: ClearBookShelfAction) {
  return null;
}


function clearSections(state: IBookShelfState, action: ClearSectionsAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.bookSections = null;
  return newState;
}

function updateSectionSuccess(state: IBookShelfState, action: UpdateSectionSuccessAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.bookSections[action.payload.section_index] = action.payload;
  return newState;
}

function updateSectionError(state: IBookShelfState, action: UpdateSectionErrorAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  //newState.currentSection = null;
  return newState;
}

function setSelectedBook(state: IBookShelfState, action: SetSelectedBookAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  if(state.booksInAccount){
    newState.selectedBook = state.booksInAccount.find(a => a.id == action.payload);
  }
  return newState;
}

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
    let result = newState.booksInAccount.find(current => current.id == book.id);
    if(result == undefined){
      newState.booksInAccount.push(book);
    }
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
    bookSections: null,
    selectedBook: null
  };
}
