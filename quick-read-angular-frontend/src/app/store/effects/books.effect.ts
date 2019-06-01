import {catchError, map, mergeMap, switchMap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Effect, Actions, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {Action} from "@ngrx/store/src/models";
import {BookService} from "../../services/book.service";
import {ESuggestedBooksAction, GetAllSuggestedBooksSuccessAction} from "../actions/suggested-books.actions";
import {Book} from "../../models/Book";
import {HttpErrorResponse} from "@angular/common/http";
import {AddToBookShelfAction, EBooksShelfAction, GetBooksInBookshelfAction} from "../actions/book-shelf.actions";
import {BookShelf} from "../../models/BookShelf";
import {Store} from "@ngrx/store";
import {IAppState} from "../state/app.state";

@Injectable()
export class BookEffects {

  constructor(private store: Store<IAppState>, private actions$: Actions, private bookService: BookService) {}

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
          map((bookShelf: BookShelf) => {
            this.store.dispatch(new GetBooksInBookshelfAction(bookShelf.account_id));
            return { type: EBooksShelfAction.AddToBookShelfSuccess, payload: bookShelf }
          }),
          map((result) => ({ type: EBooksShelfAction.AddToBookShelfSuccess, payload: result })),
          catchError((error: HttpErrorResponse) => of({ type: EBooksShelfAction.BookShelfError, payload: error}))
        ))
    );

  @Effect()
  booksInbookShelf = this.actions$
    .pipe(
      ofType(EBooksShelfAction.GetBooksInBookShelf),
      mergeMap((action: GetBooksInBookshelfAction) => this.bookService.getBooksInShelf(action.payload)
        .pipe(
          map(result => ({ type: EBooksShelfAction.GetBooksInBookShelfSuccess, payload: result })),
          catchError((error: HttpErrorResponse) => of({ type: EBooksShelfAction.BookShelfError, payload: error}))
        ))
    );

  @Effect()
  readBookInShelf = this.actions$
    .pipe(
      ofType(EBooksShelfAction.ReadBook),
      mergeMap((action: GetBooksInBookshelfAction) => this.bookService.getBookSections(action.payload)
        .pipe(
          map(result => ({ type: EBooksShelfAction.ReadBookSuccess, payload: result })),
          catchError((error: HttpErrorResponse) => of({ type: EBooksShelfAction.ReadBookError, payload: error}))
        ))
    );

}
