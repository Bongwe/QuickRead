import { Action } from '@ngrx/store';
import {BookSection} from "../../models/BookSection";

export enum ESectionAction {
  ReadSection = '[Section Component] Read section',
}

export class ReadSectionAction implements Action {
  readonly type = ESectionAction.ReadSection;
  constructor(public payload: BookSection){
  }
}

export type SectionAction = ReadSectionAction;
