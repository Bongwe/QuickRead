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

  public currentSeconds: number = 0;
  public currentMinutes: number = 0;
  public minimumReadTime = 600; //600 seconds is 10 minutes

  public modalMessage: string;
  private modalRef;
  @ViewChild('myModal') myModal;

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
  }

  closeSection() {
    if(this.currentSeconds >= (this.minimumReadTime * 60)){
      // update the state with user progress
      this.store.dispatch(new ClearCurrentSectionAction());
      this.router.navigate(['/viewSections']);
    } else {
      this.modalMessage = this.getCloseModalMessage();
      this.openModal();
    }
  }

  getCloseModalMessage() {
    let less_than_60_seconds = 1;
    this.currentMinutes = this.calculateMinutes(this.currentSeconds);
    let currentMinStr = (this.currentMinutes < less_than_60_seconds) ? 'less than a' : this.currentMinutes;
    let currentReadingTimeMsg = "You have only been reading for " + currentMinStr + " minute(s).";
    let requiredReadingTimeMsg = "Read for at least " + this.settings.min_read_time + " minute(s) before closing the section."
    return currentReadingTimeMsg + '\n' + requiredReadingTimeMsg;
  }

  calculateMinutes(seconds: number): number{
    let minute = seconds / 60;
    return Math.trunc(minute);
  }

  nextSection() {

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
