import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {selectBookShelf, selectSection} from "../../store/selectors/profile.selectors";
import {ISectionState} from "../../store/reducers/section.reducer";
import {BookSection} from "../../models/BookSection";
import {IBookShelfState} from "../../store/reducers/book-shelf.reducer";
import {Book} from "../../models/Book";
import {ClearCurrentSectionAction} from "../../store/actions/section.actions";

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  public currentSection: BookSection;
  public book: Book;

  constructor(private store: Store<IAppState>,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.store.select(selectSection).subscribe((state: ISectionState) =>{
      if(state && state.currentSection){
        this.currentSection = state.currentSection;
      }
    });
    this.store.select(selectBookShelf).subscribe((state: IBookShelfState) =>{
      if(state && state.selectedBook){
        this.book =  state.selectedBook;
      }
    });
  }

  closeSection() {
    this.store.dispatch(new ClearCurrentSectionAction());
    this.router.navigate(['/viewSections']);
  }

  nextSection() {

  }

}
