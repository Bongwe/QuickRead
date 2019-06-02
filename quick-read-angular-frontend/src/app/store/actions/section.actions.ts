import { Action } from '@ngrx/store';
import {BookSection} from "../../models/BookSection";

export enum ESectionAction {
  ReadSection = '[Section Component] Read section',
  ClearCurrentSection = '[Section Component] Clear current section',
}

export class ClearCurrentSectionAction implements Action {
  readonly type = ESectionAction.ClearCurrentSection;
}


export class ReadSectionAction implements Action {
  readonly type = ESectionAction.ReadSection;
  constructor(public payload: BookSection){
  }
}

export type SectionAction = ReadSectionAction | ClearCurrentSectionAction;
