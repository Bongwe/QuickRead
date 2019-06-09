import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {
  selectAccounts,
  selectBookShelf,
  selectGameState,
  selectSection,
  selectSettings
} from "../../store/selectors/app.selectors";
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
import {IGameState} from "../../store/reducers/gameState.reducer";

import * as moment from 'moment';
import {Settings} from "../../models/Settings";
import {ISettingsState} from "../../store/reducers/settings.reducer";
import {READ_EVERY_DAY, READ_EVERY_MINUTE} from "../../models/Messages";
import {SelectedOpponent} from "../../models/SelectedOpponent";
import {UpdateOpponentAction} from "../../store/actions/book-shelf.actions";
import {UpdateAccountAction} from "../../store/actions/account.actions";

@Component({
  selector: 'app-reading',
  templateUrl: './view-sections.component.html',
  styleUrls: ['./view-sections.component.css']
})
export class ViewSectionsComponent implements OnInit {

  public bookSections: Array<SectionDTO>;
  public book: Book;
  public playerImageSrc;
  public playerImageSrBase = "../../../assets/img/opponents2/" ;
  public opponentImageSrc = "../../../assets/img/opponents2/";
  public currentSection: BookSection;
  public previousSection: BookSection;

  public bookSectionCompleteness: number = 0;
  public totalCompletedSections: number = 0;

  public selectedAccount: qrAccount;
  public gameState: GameState;
  public settings: Settings;
  public currentOpponent: SelectedOpponent;

  @ViewChild('inaccessibleSection') inaccessibleSection;
  @ViewChild('bookCompleteMessage') bookCompleteMessage;
  @ViewChild('dealPlayerDamage') dealPlayerDamage;
  @ViewChild('dealOpponentDamage') dealOpponentDamage;
  private modalRef;
  private bookCompleteModalRef;
  private dealOpponentDamageModalRef;
  private dealPlayerDamageModalRef;

  constructor(private store: Store<IAppState>,
              private formBuilder: FormBuilder,
              private modalService: ModalManager,
              private router: Router) {
  }

  ngOnInit() {
    this.store.select(selectGameState).subscribe((state: IGameState) =>{
      if(state && state.gameState){
        this.gameState = state.gameState;
      }
    });
    this.store.select(selectAccounts).subscribe((state: IAccountState) =>{
      if(state && state.selectedAccount){
        this.selectedAccount = state.selectedAccount;
        this.playerImageSrc = this.playerImageSrBase + this.selectedAccount.profile_picture;
      }
    });
    this.store.select(selectSettings).subscribe((state: ISettingsState) =>{
      if(state && state.settings){
       this.settings = state.settings;
      }
    });

    this.store.select(selectSection).subscribe((state: ISectionState) =>{
      if(state && state.currentSection){
        this.currentSection = state.currentSection;
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

    this.currentOpponent = this.getCurrentOpponent();

    let completePercent = this.calculateSectionCompleteness();

    if(completePercent >= 100) {
      this.openBooksCompleteModal();
    }
    this.manageGameSate();
  }

  calculateSectionCompleteness(): number {
    if (this.bookSections) {
      for(let sectionGroup of this.bookSections) {
        for(let section of sectionGroup.sectionList){
          if(section.status == BookStatus.COMPLETE){
            this.totalCompletedSections++;
          }
        }
      }
      this.bookSectionCompleteness = this.totalCompletedSections / this.bookSections.length;
      this.bookSectionCompleteness = this.bookSectionCompleteness * 100;
      return this.bookSectionCompleteness;
    }
    return 0;
  }

  readSelectedSection(section: BookSection, groupIndex: number, sectionIndex: number) {
    let prevIndex = section.section_index - 1;
    if(prevIndex == -1){
      this.updateGameState();
      this.store.dispatch(new ReadSectionAction(section));
      this.router.navigate(['/readSection']);
    } else if(prevIndex >= 0 ) {
      let sectionDTO = this.bookSections[groupIndex].sectionList;
      if(sectionDTO[prevIndex].status == BookStatus.COMPLETE){
        this.updateGameState();
        this.store.dispatch(new ReadSectionAction(section));
        this.router.navigate(['/readSection']);
      } else {
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

  openDealOpponentDamageModal(){
    this.dealOpponentDamageModalRef = this.modalService.open(this.dealOpponentDamage, {
      size: "md",
      modalClass: 'dealOpponentDamage',
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop"
    })
  }
  openDealPlayerDamage(){
    this.dealPlayerDamageModalRef = this.modalService.open(this.dealPlayerDamage, {
      size: "md",
      modalClass: 'dealPlayerDamage',
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

  closeDealPlayerDamageModal(){
    this.modalService.close(this.dealPlayerDamageModalRef);
  }

  closeOpponentDamageModal(){
    this.modalService.close(this.dealOpponentDamageModalRef);
  }

  enemyImageSrc(avatar: string) {
    return this.opponentImageSrc + avatar;
  }

  private manageGameSate() {
    if(this.gameState){
      if(this.settings && this.settings.read_every == READ_EVERY_DAY) {
        if(this.isReadingEveryDay()) {
          this.dealDamageToOpponent();
        } else{
          //this.dealDamageToPlayer();
        }
      } else if (this.settings && this.settings.read_every == READ_EVERY_MINUTE) {
        if(this.isReadingEveryMinute()) {
          this.dealDamageToOpponent();
        } else{
          //this.dealDamageToPlayer();
        }
      }
    }
  }

  private isReadingEveryDay() {
    let currentDay = moment().day();
    return this.gameState.day - currentDay == (currentDay - 1) || this.gameState.day - currentDay == 0;
  }

  private isReadingEveryMinute() {
    let currentMinute = moment().minute();
    return currentMinute >= (this.gameState.minute) && currentMinute <= (this.gameState.minute + 1);

  }

  private dealDamageToOpponent() {
    let dealtDamage = false;

    for(let index = 0; index < this.bookSections.length && dealtDamage == false; index++) {
      for(let section of this.bookSections[index].sectionList) {
        if(this.currentSection && this.currentSection.id == section.id && section.status === BookStatus.COMPLETE){
          this.bookSections[index].opponent.health = this.bookSections[index].opponent.health - 25;
          this.store.dispatch(new UpdateOpponentAction(this.bookSections[index].opponent));
          this.openDealOpponentDamageModal();
          dealtDamage = true;
          break;
        }
      }
    }
  }

  private updateGameState(): void {
    let gameSate = new GameState();
    gameSate.day =  moment().day(); //day of the week
    gameSate.minute =  moment().minute();
    gameSate.second =  moment().second();
    gameSate.account_id = this.selectedAccount.id;
    this.store.dispatch(new UpdateGameStateAction(gameSate));
  }

  private dealDamageToPlayer() {
    this.selectedAccount.health = this.selectedAccount.health - 25;
    this.store.dispatch(new UpdateAccountAction(this.selectedAccount));
    this.openDealPlayerDamage();
  }

  getPlayerHealth() {
    return this.selectedAccount.health;
  }

  private getCurrentOpponent(): SelectedOpponent {
    for(let index = 0; index < this.bookSections.length; index++) {
      for(let section of this.bookSections[index].sectionList) {
        if(section.status === BookStatus.IN_PROGRESS || section.status === BookStatus.UN_READ){
          return this.bookSections[index].opponent;
        }
      }
    }
    return null;
  }
}
