import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {selectAccounts, selectBookShelf} from "../../store/selectors/app.selectors";
import {IAccountState} from "../../store/reducers/account.reducer";
import {GetBooksInBookshelfAction, ReadBookAction, SetSelectedBookAction} from "../../store/actions/book-shelf.actions";
import {Book} from "../../models/Book";
import {IBookShelfState} from "../../store/reducers/book-shelf.reducer";

@Component({
  selector: 'app-book-shelf',
  templateUrl: './book-shelf.component.html',
  styleUrls: ['./book-shelf.component.css']
})
export class BookShelfComponent implements OnInit {

  private accountId: number;
  public booksInShelf: Array<Book>;

  constructor(private store: Store<IAppState>,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.store.select(selectAccounts).subscribe((state: IAccountState) =>{
      if(state && state.selectedAccount){
        this.accountId = state.selectedAccount.id;
      }
    });
    this.store.select(selectBookShelf).subscribe((state: IBookShelfState) =>{
      if(state && state.booksInAccount){
        this.booksInShelf = state.booksInAccount;
      }
    });
    this.store.select(selectBookShelf).subscribe((state: IBookShelfState) =>{
      if(state && state.bookSections){
        this.router.navigate(['/viewSections']);
      }
    });
    this.store.dispatch(new GetBooksInBookshelfAction(this.accountId));
  }

  readBook(bookId: number) {
    this.store.dispatch(new ReadBookAction(bookId));
    this.store.dispatch(new SetSelectedBookAction(bookId));
  }
}
