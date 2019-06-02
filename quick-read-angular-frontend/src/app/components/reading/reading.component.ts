import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {selectBookShelf} from "../../store/selectors/profile.selectors";
import {IBookShelfState} from "../../store/reducers/book-shelf.reducer";
import {Book} from "../../models/Book";
import {BookSection} from "../../models/BookSection";
import {SectionGroup} from "../../models/SectionGroup";

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.css']
})
export class ReadingComponent implements OnInit {

  private bookSections: Array<BookSection>;
  private sectionsInitialised: boolean = false;
  public book: Book;
  public sectionGroups: Array<SectionGroup>;
  public sectionCount = 0;
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
        if(this.sectionsInitialised == false){
          this.createGroupSections(this.bookSections);
        }
        if(state.bookSections[0]){
          this.book = state.booksInAccount.find(a => a.id == state.bookSections[0].book_id);
        }
      }
    });
  }

  private createGroupSections(bookSections: Array<BookSection>) {
    let count = 0;
    let sectionGroup = new SectionGroup();
    sectionGroup.opponent = "snake.png";
    sectionGroup.opponent = "giraffe.png";
    this.sectionsInitialised = true;
    sectionGroup.sections = new Array<BookSection>();
    for (let bookSection of bookSections) {
      sectionGroup.sections.push(bookSection);
      if(count == 3) {
        this.sectionGroups.push(sectionGroup);
        count = 0;
        sectionGroup = new SectionGroup();
        sectionGroup.sections = new Array<BookSection>();
      } else {
        count++;
      }
    }
  }

}
