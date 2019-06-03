import {Component, OnInit, ViewChild} from '@angular/core';
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
import {BookStatus} from "../../models/BookStatus";
import {ModalManager} from "ngb-modal";

@Component({
  selector: 'app-reading',
  templateUrl: './view-sections.component.html',
  styleUrls: ['./view-sections.component.css']
})
export class ViewSectionsComponent implements OnInit {

  public bookSections: Array<BookSection>;
  public book: Book;
  public sectionGroups: Array<SectionGroup>;
  public playerImageSrc = "../../../assets/img/opponents/giraffe.png" ;
  public opponentImageSrc = "../../../assets/img/opponents/snake.png";

  public currentSection: BookSection;
  public previousSection: BookSection;

  @ViewChild('inaccessibleSection') inaccessibleSection;
  private modalRef;

  constructor(private store: Store<IAppState>,
              private formBuilder: FormBuilder,
              private modalService: ModalManager,
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
    let prevIndex = section.section_index - 1;
    this.currentSection = section;
    if(prevIndex == -1){
      this.store.dispatch(new ReadSectionAction(section));
    } else if(prevIndex >= 0 && this.bookSections[prevIndex].status == BookStatus.COMPLETE){
      this.store.dispatch(new ReadSectionAction(section));
    } else {
      this.previousSection = this.bookSections[prevIndex];
      this.openModal();
    }
  }

  getSectionIconImage(section: BookSection) {
    return "../../../assets/img/sectionIcon/" + section.status_picture;
  }

  openModal(){
    this.modalRef = this.modalService.open(this.inaccessibleSection, {
      size: "md",
      modalClass: 'inaccessibleSection',
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

}
