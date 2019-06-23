import { Action } from '@ngrx/store';
import {Book} from "../../models/Book";
import {BookShelf} from "../../models/BookShelf";
import {BookSection} from "../../models/BookSection";
import {HttpErrorResponse} from "@angular/common/http";
import {SectionDTO} from "../../models/dto/SectionDTO";
import {SelectedOpponent} from "../../models/SelectedOpponent";
import {Player} from "../../models/Player";

export enum EBooksShelfAction {
  AddToBookShelf = '[Book Shelf Component] Add to book shelf',
  AddToBookShelfSuccess = '[Book Shelf Component] Add to book shelf success',
  BookShelfError = '[Book Shelf Component] Book shelf error',
  GetBooksInBookShelf = '[Book Shelf Component] Get books in book shelf',
  GetBooksInBookShelfSuccess = '[Book Shelf Component] Get books in book shelf success',
  ReadBook = '[Book Shelf Component] Read book in book shelf',
  ReadBookSuccess = '[Book Shelf Component] Read book success in book shelf',
  ReadBookError = '[Book Shelf Component] Read book error in book shelf',
  SetSelectedBook = '[Book Shelf Component] Set selected book',
  UpdateSection = '[Book Shelf Component] Update current section',
  UpdateSectionSuccess = '[Book Shelf Component] Update current section success',
  UpdateSectionError = '[Book Shelf Component] Update current section error',
  ClearSections = '[Book Shelf Component] Clear sections',
  ClearBookShelf = '[Book Shelf Component] Clear book shelf',
  UpdateOpponent = '[Section Component] Update opponent',
  UpdateOpponentSuccess = '[Section Component] Update opponent success',
  UpdateOpponentError = '[Section Component] Update opponent health error',
  UpdatePlayer = '[Section Component] Update player',
  UpdatePlayerSuccess = '[Section Component] Update player success',
  UpdatePlayerError = '[Section Component] Update player health error',
}

export class UpdatePlayerAction implements Action {
  readonly type = EBooksShelfAction.UpdatePlayer;
  constructor(public player: Player){
  }
}

export class UpdatePlayerErrorAction implements Action {
  readonly type = EBooksShelfAction.UpdatePlayerError;
  constructor(public payload: HttpErrorResponse){
  }
}

export class UpdatePlayerSuccessAction implements Action {
  readonly type = EBooksShelfAction.UpdatePlayerSuccess;
  constructor(public player: Player){
  }
}

export class UpdateOpponentSuccessAction implements Action {
  readonly type = EBooksShelfAction.UpdateOpponentSuccess;
  constructor(public payload: SelectedOpponent){
  }
}

export class UpdateOpponentErrorAction implements Action {
  readonly type = EBooksShelfAction.UpdateOpponentError;
  constructor(public payload: HttpErrorResponse){
  }
}

export class UpdateOpponentAction implements Action {
  readonly type = EBooksShelfAction.UpdateOpponent;
  constructor(public payload: SelectedOpponent){
  }
}

export class ClearBookShelfAction implements Action {
  readonly type = EBooksShelfAction.ClearBookShelf;
}

export class ClearSectionsAction implements Action {
  readonly type = EBooksShelfAction.ClearSections;
}

export class UpdateSectionAction implements Action {
  readonly type = EBooksShelfAction.UpdateSection;
  constructor(public payload: BookSection){
  }
}

export class UpdateSectionSuccessAction implements Action {
  readonly type = EBooksShelfAction.UpdateSectionSuccess;
  constructor(public payload: BookSection){
  }
}

export class UpdateSectionErrorAction implements Action {
  readonly type = EBooksShelfAction.UpdateSectionError;
  constructor(public payload: HttpErrorResponse){
  }
}

export class SetSelectedBookAction implements Action {
  readonly type = EBooksShelfAction.SetSelectedBook;
  constructor(public bookId: number){
  }
}

export class ReadBookSErrorAction implements Action {
  readonly type = EBooksShelfAction.ReadBookError;
  constructor(public payload: string){
  }
}

export class ReadBookSuccessAction implements Action {
  readonly type = EBooksShelfAction.ReadBookSuccess;
  constructor(public payload: Array<SectionDTO>){
  }
}

export class ReadBookPayload {
  bookId: number;
  accountId: number;
}

export class ReadBookAction implements Action {
  readonly type = EBooksShelfAction.ReadBook;
  payload: ReadBookPayload;
  constructor(public bookId: number,public  accountId: number){
    this.payload = {
      bookId: bookId,
      accountId: accountId
    }
  }
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
  | GetBooksInBookshelfAction | GetBooksInBookshelfSuccessAction | ReadBookAction | ReadBookSErrorAction
  | ReadBookSuccessAction | SetSelectedBookAction | UpdateSectionAction | UpdateSectionSuccessAction
  | UpdateSectionErrorAction | ClearSectionsAction | ClearBookShelfAction | UpdateOpponentSuccessAction
  | UpdateOpponentErrorAction | UpdateOpponentAction | UpdatePlayerSuccessAction | UpdatePlayerErrorAction;
