import {Component, OnInit, ViewChild} from '@angular/core';
import {Book} from "../../models/Book";
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {selectBooks} from "../../store/selectors/book.selectors";
import {ISuggestedBookState} from "../../store/reducers/suggested-books.reducer";
import {BookShelf} from "../../models/BookShelf";
import {AddToBookShelfAction, GetBooksInBookshelfAction} from "../../store/actions/book-shelf.actions";
import {qrAccount} from "../../models/Account";
import {selectAccounts} from "../../store/selectors/app.selectors";
import {IAccountState} from "../../store/reducers/account.reducer";

import * as _ from 'lodash';
import {ModalManager} from "ngb-modal";

@Component({
  selector: 'app-suggested-books',
  templateUrl: './suggested-books.component.html',
  styleUrls: ['./suggested-books.component.css']
})
export class SuggestedBooksComponent implements OnInit {

  books: Book[];
  private account: qrAccount;
  selectedBook: Book = new Book();

  modalRef;
  modalHeader: string = "Registration";
  modalContent: string = "Your account has been successfully created.";
  @ViewChild('myModal') myModal;

  constructor(private store: Store<IAppState>,
              private modalService: ModalManager) { }

  ngOnInit() {
    this.store.select(selectAccounts).subscribe((account: IAccountState) =>{
      if(account){
        this.account = _.cloneDeep(account.selectedAccount);
      }
    });
    this.store.select(selectBooks).subscribe((books: ISuggestedBookState) =>{
      if(books){
        this.books = books.allBooks;
      }
    });
  }

  public addBookToShelve(id: number) {
    let bookShelf = new BookShelf();
    bookShelf.book_id = id;
    bookShelf.account_id = this.account.id;
    this.store.dispatch(new AddToBookShelfAction(bookShelf));
  }

  //---Modal Stuff---
  openModal(){
    this.modalRef = this.modalService.open(this.myModal, {
      size: "md",
      modalClass: 'mymodal',
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop"
    })
  }

  closeModal(){
    this.modalService.close(this.modalRef);
  }

  onSelectBook(book: Book) {
    this.selectedBook = book;
    this.openModal();
  }
}
