import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {selectBookShelf, selectSection, selectSettings} from "../../store/selectors/profile.selectors";
import {ISectionState} from "../../store/reducers/section.reducer";
import {BookSection} from "../../models/BookSection";
import {IBookShelfState} from "../../store/reducers/book-shelf.reducer";
import {Book} from "../../models/Book";
import {ClearCurrentSectionAction} from "../../store/actions/section.actions";
import {ModalManager} from "ngb-modal";
import {ISettingsState} from "../../store/reducers/settings.reducer";
import * as _ from "lodash";
import {Settings} from "../../models/Settings";
import {BookStatus} from "../../models/BookStatus";
import {UpdateSectionAction} from "../../store/actions/book-shelf.actions";

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit,OnDestroy {

  public book: Book;
  public currentSection: BookSection;
  public previousSection: BookSection;
  private timeOutHandle;
  private scrollResult = "0";

  public currentSeconds: number = 0;
  public currentMinutes: number = 0;
  public bookSectionCompleteMessage:string = "How much progress have you made with this section of the book?";

  public modalMessage: string;
  private modalRef;
  private sectionCompleteModalRef;
  @ViewChild('myModal') myModal;
  @ViewChild('sectionStatus') sectionCompleteModal;

  private settings: Settings;

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
    this.store.select(selectSettings).subscribe((state: ISettingsState) =>{
      if(state && state.settings){
        this.settings = _.cloneDeep(state.settings);
      }
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
    clearInterval(this.timeOutHandle);
    this.store.dispatch(new ClearCurrentSectionAction());
  }

  closeSection() {
    if(this.currentSeconds >= (this.settings.min_read_time * 60)) {
      this.openReadingCompleteModal();
    } else {
      this.modalMessage = this.getMinimumTimeMessage();
      this.openModal();
    }
  }

  nextSection(){

  }

  getMinimumTimeMessage() {
    let currentMinStr = (this.currentSeconds < 60) ? 'less than a' :this.getCurrentTimeInMinutes(this.currentSeconds);
    let currentReadingTimeMsg = "You have only been reading for " + currentMinStr + " minute(s).";
    let requiredReadingTimeMsg = "Read for at least " + this.settings.min_read_time + " minute(s) before closing the section."
    return currentReadingTimeMsg + '\n' + requiredReadingTimeMsg;
  }

  getCurrentTimeInMinutes(seconds: number) {
    return Math.trunc( seconds / 60);
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

  openReadingCompleteModal() {
    this.sectionCompleteModalRef = this.modalService.open(this.sectionCompleteModal, {
      size: "md",
      modalClass: 'sectionStatus',
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

  closeSectionCompleteModal() {
    this.modalService.close(this.sectionCompleteModalRef);
  }

  onSectionInProgress() {
    this.currentSection.status = BookStatus.IN_PROGRESS;
    this.currentSection.status_picture = "sectionInProgressIcon.png";
    this.store.dispatch(new UpdateSectionAction(this.currentSection));
    this.store.dispatch(new ClearCurrentSectionAction());
    this.closeSectionCompleteModal();
  }

  onSectionComplete() {
    this.currentSection.status = BookStatus.COMPLETE;
    this.currentSection.status_picture = "sectionCompleteIcon.png";
    this.store.dispatch(new UpdateSectionAction(this.currentSection));
    this.store.dispatch(new ClearCurrentSectionAction());
    this.closeSectionCompleteModal();
  }

  startTimer() {
    this.timeOutHandle = setInterval(() => {
      this.currentSeconds++;
      console.log(this.currentSeconds);
    },1000)
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

}
