import { Action } from '@ngrx/store';
import {Book} from "../../models/Book";

export enum ESuggestedBooksAction {
  GetAllSuggestedBooks = '[Suggested Books Component] Get all suggested books',
  GetAllSuggestedBooksSuccess = '[Suggested Books Component] Get all suggested books success',
  GetAllSuggestedBooksError = '[Suggested Books Component] Get all suggested books Error',
  ClearSuggestedBooks= '[Suggested Books Component] Clear suggested books',
}

export class ClearSuggestedBooksAction implements Action {
  readonly type = ESuggestedBooksAction.ClearSuggestedBooks;
}

export class GetAllSuggestedBooksAction implements Action {
  readonly type = ESuggestedBooksAction.GetAllSuggestedBooks;
}

export class GetAllSuggestedBooksSuccessAction implements Action {
  public readonly type = ESuggestedBooksAction.GetAllSuggestedBooksSuccess;
  constructor(public payload: Book[]){
  }
}

export type SuggestedBookAction = GetAllSuggestedBooksSuccessAction | GetAllSuggestedBooksAction | ClearSuggestedBooksAction;
