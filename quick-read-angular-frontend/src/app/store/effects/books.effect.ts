import {catchError, map, mergeMap, switchMap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Effect, Actions, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {Action} from "@ngrx/store/src/models";
import {BookService} from "../../services/book.service";
import {ESuggestedBooksAction, GetAllSuggestedBooksSuccessAction} from "../actions/suggested-books.actions";
import {Book} from "../../models/Book";
import {CreateAccount, EProfileAction} from "../actions/account.actions";
import {HttpErrorResponse} from "@angular/common/http";
import {BookShelf} from "../../models/BookShelf";
import {AddToBookShelfAction, EBooksShelfAction} from "../actions/book-shelf.actions";

@Injectable()
export class BookEffects {

  constructor(private actions$: Actions, private bookService: BookService) {}

  @Effect()
  protected fetch$: Observable<Action> = this.actions$
    .pipe(
      ofType(ESuggestedBooksAction.GetAllSuggestedBooks),
      switchMap(() => this.bookService.getAll()),
      switchMap((books: Book[])=> {
        return of(new GetAllSuggestedBooksSuccessAction(books))
      })
    );

  @Effect()
  updateAccount$ = this.actions$
    .pipe(
      ofType(EBooksShelfAction.AddToBookShelf),
      mergeMap((action: AddToBookShelfAction) => this.bookService.postSuggestedBook(action.payload)
        .pipe(
          map(result => ({ type: EBooksShelfAction.AddToBookShelfSuccess, payload: result })),
          catchError((error: HttpErrorResponse) => of({ type: EBooksShelfAction.AddToBookShelfError, payload: error}))
        ))
    );
}
