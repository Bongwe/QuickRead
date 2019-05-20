import { Action } from '@ngrx/store';
import {Book} from "../../models/Book";

export enum EBookAction {
  GetAllBooks = '[Book Component] Get All Books',
  GetAllBooksSuccess = '[Book Component] Get All Books Success',
  GetAllBooksError = '[Book Component] Get All Books Error',
}

export class GetAllBooks implements Action {
  readonly type = EBookAction.GetAllBooks;
}

export class GetAllBooksSuccess implements Action {
  public readonly type = EBookAction.GetAllBooksSuccess;
  constructor(public payload: Book[]){
  }
}

export type BookAction = GetAllBooks | GetAllBooksSuccess;
