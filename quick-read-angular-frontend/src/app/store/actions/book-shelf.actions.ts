import { Action } from '@ngrx/store';
import {Book} from "../../models/Book";
import {BookShelf} from "../../models/BookShelf";

export enum EBooksShelfAction {
  AddToBookShelf = '[Book Shelf Component] Add to book shelf',
  AddToBookShelfSuccess = '[Book Shelf Component] Add to book shelf success',
  BookShelfError = '[Book Shelf Component] Book shelf error',
  GetBooksInBookShelf = '[Book Shelf Component] Get books in book shelf',
  GetBooksInBookShelfSuccess = '[Book Shelf Component] Get books in book shelf success',
}

export class GetBooksInBookshelfSuccessAction implements Action {
  readonly type = EBooksShelfAction.GetBooksInBookShelfSuccess;
  constructor(public payload: Array<Book>){
  }
}

export class GetBooksInBookshelfAction implements Action {
  readonly type = EBooksShelfAction.GetBooksInBookShelf;
  constructor(public payload: number){
  }
}

export class AddToBookShelfErrorAction implements Action {
  readonly type = EBooksShelfAction.BookShelfError;
}

export class AddToBookShelfSuccessAction implements Action {
  readonly type = EBooksShelfAction.AddToBookShelfSuccess;
}

export class AddToBookShelfAction implements Action {
  readonly type = EBooksShelfAction.AddToBookShelf;
  constructor(public payload: BookShelf){
  }
}

export type BookShelfAction = AddToBookShelfAction | AddToBookShelfSuccessAction | AddToBookShelfErrorAction
  | GetBooksInBookshelfAction | GetBooksInBookshelfSuccessAction;
