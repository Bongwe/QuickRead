import { Action } from '@ngrx/store';
import {BookShelf} from "../../models/BookShelf";

export enum EBooksShelfAction {
  AddToBookShelf = '[Book Shelf Component] Add to book shelf',
  AddToBookShelfSuccess = '[Book Shelf Component] Add to book shelf success',
  AddToBookShelfError = '[Book Shelf Component] Add to book shelf error',
}

export class AddToBookShelfErrorAction implements Action {
  readonly type = EBooksShelfAction.AddToBookShelfError;
}

export class AddToBookShelfSuccessAction implements Action {
  readonly type = EBooksShelfAction.AddToBookShelfSuccess;
}

export class AddToBookShelfAction implements Action {
  readonly type = EBooksShelfAction.AddToBookShelf;
  constructor(public payload: BookShelf){
  }
}

export type BookShelfAction = AddToBookShelfAction | AddToBookShelfSuccessAction | AddToBookShelfErrorAction;
