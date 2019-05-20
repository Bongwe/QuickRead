import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {selectBooks} from "../../store/selectors/book.selectors";
import {IBookState} from "../../store/reducers/book.reducer";
import {Book} from "../../models/Book";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  books: Book[];
  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.store.select(selectBooks).subscribe((books: IBookState) =>{
      if(books){
        this.books = books.allBooks;
      }
    });
  }

}
