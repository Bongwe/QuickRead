import { Action } from '@ngrx/store';
import {BookSection} from "../../models/BookSection";

export enum ESectionAction {
  ReadSection = '[Section Component] Read section',
  ClearCurrentSection = '[Section Component] Clear current section',
  /*UpdateSection = '[Section Component] Update current section',
  UpdateSectionSuccess = '[Section Component] Update current section success',
  UpdateSectionError = '[Section Component] Update current section error',*/
}

/*
export class UpdateSectionSuccessAction implements Action {
  readonly type = ESectionAction.UpdateSectionSuccess;
  constructor(public payload: BookSection){
  }
}

export class UpdateSectionErrorAction implements Action {
  readonly type = ESectionAction.UpdateSectionError;
  constructor(public payload: HttpErrorResponse){
  }
}
*/

/*export class UpdateCurrentSectionAction implements Action {
  readonly type = ESectionAction.ClearCurrentSection;
  constructor(public payload: BookSection){
  }
}*/

export class ClearCurrentSectionAction implements Action {
  readonly type = ESectionAction.ClearCurrentSection;
}

export class ReadSectionAction implements Action {
  readonly type = ESectionAction.ReadSection;
  constructor(public payload: BookSection, public section_index, public group_index){
  }
}

export type SectionAction = ReadSectionAction | ClearCurrentSectionAction;
