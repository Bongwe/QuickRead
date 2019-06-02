import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
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
export class SectionComponent implements OnInit,OnDestroy {

  public currentSection: BookSection;
  public book: Book;
  public current: string = "5";
  public prevValue: string = "0";

  constructor(private store: Store<IAppState>,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true); //third parameter
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

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (): string => {
    let winScroll = event.srcElement.scrollTop;
    let height = event.srcElement.scrollHeight - event.srcElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    let result = scrolled.toPrecision(1);
    return result;
  };

  closeSection() {
    this.store.dispatch(new ClearCurrentSectionAction());
    this.router.navigate(['/viewSections']);
  }

  nextSection() {

  }

}
