import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {selectBookShelf, selectSection} from "../../store/selectors/profile.selectors";
import {IBookShelfState} from "../../store/reducers/book-shelf.reducer";
import {Book} from "../../models/Book";
import {BookSection} from "../../models/BookSection";
import {SectionGroup} from "../../models/SectionGroup";
import {ReadSectionAction} from "../../store/actions/section.actions";
import {ISectionState} from "../../store/reducers/section.reducer";

@Component({
  selector: 'app-reading',
  templateUrl: './view-sections.component.html',
  styleUrls: ['./view-sections.component.css']
})
export class ViewSectionsComponent implements OnInit {

  private bookSections: Array<BookSection>;
  private sectionsInitialised: boolean = false;
  public book: Book;
  public sectionGroups: Array<SectionGroup>;
  public playerImageSrc = "../../../assets/img/opponents/giraffe.png" ;
  public opponentImageSrc = "../../../assets/img/opponents/snake.png";

  constructor(private store: Store<IAppState>,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.sectionGroups = new Array<SectionGroup>();
  }

  ngOnInit() {
    this.store.select(selectBookShelf).subscribe((state: IBookShelfState) =>{
      if(state && state.bookSections){
        this.bookSections = state.bookSections;
      }
      if(state && state.selectedBook){
        this.book =  state.selectedBook;
      }
    });
    this.store.select(selectSection).subscribe((state: ISectionState) =>{
      if(state && state.currentSection){
        this.router.navigate(['/readSection']);
      }
    });
  }

  readSelectedSection(section: BookSection, index: number) {
    section.index = index;
    this.store.dispatch(new ReadSectionAction(section));
  }

}
