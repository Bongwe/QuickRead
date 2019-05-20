import {switchMap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Effect, Actions, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {Action} from "@ngrx/store/src/models";
import {BookService} from "../../services/book.service";
import {EBookAction, GetAllBooksSuccess} from "../actions/book.actions";
import {Book} from "../../models/Book";

@Injectable()
export class BookEffects {

  constructor(private actions$: Actions, private bookService: BookService) {}

  @Effect()
  protected fetch$: Observable<Action> = this.actions$
    .pipe(
      ofType(EBookAction.GetAllBooks),
      switchMap(() => this.bookService.getAll()),
      switchMap((books: Book[])=> {
        return of(new GetAllBooksSuccess(books))
      })
    );
}
