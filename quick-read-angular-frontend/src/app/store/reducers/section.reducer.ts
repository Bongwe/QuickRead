import * as _ from 'lodash';
import {
  ClearCurrentSectionAction,
  ESectionAction,
  ReadSectionAction,
  SectionAction
} from "../actions/section.actions";
import {BookSection} from "../../models/BookSection";

export interface ISectionState {
  currentSection: BookSection;
  sectionIndex: number;
}

export const initialSectionState: ISectionState = null;

export function sectionReducer (state = initialSectionState, action: SectionAction): ISectionState {
  switch (action.type) {
    case ESectionAction.ReadSection:
      return setCurrentSection(state, action);
    case ESectionAction.ClearCurrentSection:
      return clearCurrentSection(state, action);
    default:
      return state;
  }
};

function clearCurrentSection(state: ISectionState, action: ClearCurrentSectionAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.currentSection = null;
  return newState;
}

function setCurrentSection(state: ISectionState, action: ReadSectionAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.currentSection = action.payload;
  return newState;
}

function createEmptyState(){
  return {
    currentSection:  null,
    sectionIndex:  null,
  };
}

