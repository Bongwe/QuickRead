import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {selectAccounts, selectBookShelf, selectSection} from "../../store/selectors/app.selectors";
import {IBookShelfState} from "../../store/reducers/book-shelf.reducer";
import {Book} from "../../models/Book";
import {BookSection} from "../../models/BookSection";
import {ReadSectionAction} from "../../store/actions/section.actions";
import {ISectionState} from "../../store/reducers/section.reducer";
import {BookStatus} from "../../models/BookStatus";
import {ModalManager} from "ngb-modal";
import {SectionDTO} from "../../models/dto/SectionDTO";
import {UpdateGameStateAction} from "../../store/actions/gameState.actions";
import {GameState} from "../../models/GameState";
import {IAccountState} from "../../store/reducers/account.reducer";
import {qrAccount} from "../../models/Account";

@Component({
  selector: 'app-reading',
  templateUrl: './view-sections.component.html',
  styleUrls: ['./view-sections.component.css']
})
export class ViewSectionsComponent implements OnInit {

  public bookSections: Array<SectionDTO>;
  public book: Book;
  public playerImageSrc = "../../../assets/img/opponents2/greedy-reaper.png" ;
  public opponentImageSrc = "../../../assets/img/opponents2/";
  public currentSection: BookSection;
  public previousSection: BookSection;

  public bookSectionCompleteness: number = 0;
  public totalCompletedSections: number = 0;

  public selectedAccount: qrAccount;

  @ViewChild('inaccessibleSection') inaccessibleSection;
  @ViewChild('bookCompleteMessage') bookCompleteMessage;
  private modalRef;
  private bookCompleteModalRef;

  constructor(private store: Store<IAppState>,
              private formBuilder: FormBuilder,
              private modalService: ModalManager,
              private router: Router) {
  }

  ngOnInit() {
    this.store.select(selectAccounts).subscribe((state: IAccountState) =>{
      if(state && state.selectedAccount){
        this.selectedAccount = state.selectedAccount;
      }
    });

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

    let completePercent = this.calculateSectionCompleteness();

    if(completePercent >= 100) {
      this.openBooksCompleteModal();
    }
  }

  calculateSectionCompleteness(): number {
    /*if(this.bookSections){
      for(let index = 0; this.bookSections && index < this.bookSections.length; index++){
        if(this.bookSections[index].status == BookStatus.COMPLETE){
          this.totalCompletedSections++;
        }
      }
      this.bookSectionCompleteness = this.totalCompletedSections / this.bookSections.length;
      this.bookSectionCompleteness = this.bookSectionCompleteness * 100;
      return this.bookSectionCompleteness;
    }*/
    return 0;
  }

  readSelectedSection(section: BookSection, groupIndex: number, sectionIndex: number) {
    let prevIndex = section.section_index - 1;
    this.currentSection = section;
    let gameSate = new GameState();

    gameSate.lastRead = new Date();
    gameSate.account_id = this.selectedAccount.id;
    this.store.dispatch(new UpdateGameStateAction(gameSate));

    if(prevIndex == -1){
      this.store.dispatch(new ReadSectionAction(section));
    } else if(prevIndex >= 0 ) {
      let sectionDTO = this.bookSections[groupIndex].sectionList;
      if(sectionDTO[prevIndex].status == BookStatus.COMPLETE){
        this.store.dispatch(new ReadSectionAction(section));
      } else {
        //not using this now no need to display detail
        //let sectionDTO = this.bookSections[groupIndex].sectionList;
        //this.previousSection = sectionDTO[prevIndex];
        this.openModal();
      }
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

  openBooksCompleteModal(){
    this.bookCompleteModalRef = this.modalService.open(this.bookCompleteMessage, {
      size: "md",
      modalClass: 'bookCompleteMessage',
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

  closeBookCompleteModal(){
    this.modalService.close(this.bookCompleteModalRef);
  }

  enemyImageSrc(avatar: string) {
    return this.opponentImageSrc + avatar;
  }
}
