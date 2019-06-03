import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {ModalManager} from "ngb-modal";

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit,OnDestroy {

  public currentSection: BookSection;
  public book: Book;
  private timeOutHandle;
  private scrollResult = "0";

  public currentTime: number = 0;
  public minimumTimeToRead = 10;
  public modalMessage: string;

  private modalRef;
  @ViewChild('myModal') myModal;

  constructor(private store: Store<IAppState>,
              private formBuilder: FormBuilder,
              private router: Router,
              private modalService: ModalManager) {
  }

  ngOnInit() {
    this.startTimer();
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
    clearInterval(this.timeOutHandle);
  }

  scroll = (): string => {
    if(event){
      let winScroll = event.srcElement.scrollTop;
      let height = event.srcElement.scrollHeight - event.srcElement.clientHeight;
      let scrolled = (winScroll / height) * 100;
      this.scrollResult = scrolled.toPrecision(1);
    }
    return this.scrollResult;
  };

  closeSection() {
    if(this.currentTime >= this.minimumTimeToRead){
      this.store.dispatch(new ClearCurrentSectionAction());
      this.router.navigate(['/viewSections']);
    } else {
      let currentReadingTimeMsg = "You have only been reading for " + this.currentTime + " minutes.";
      let requiredReadingTimeMsg = "Read for at least " + this.minimumTimeToRead + " minutes before closing the section."
      this.modalMessage = currentReadingTimeMsg + '\n' + requiredReadingTimeMsg;
      this.openModal();
    }
  }

  nextSection() {

  }

  startTimer() {
    this.timeOutHandle = setInterval(() => {
        this.currentTime++;
    },1000)
  }

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
    //or this.modalRef.close();
  }

}
