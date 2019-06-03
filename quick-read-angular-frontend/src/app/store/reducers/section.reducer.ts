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
}

export const initialSectionState: ISectionState = null;

export function sectionReducer (state = initialSectionState, action: SectionAction): ISectionState {
  switch (action.type) {
    case ESectionAction.ReadSection:
      return setCurrentSection(state, action);
    case ESectionAction.ClearCurrentSection:
      return clearCurrentSection(state, action);
    /*case ESectionAction.UpdateSectionSuccess:
      return updateSectionSucess(state, action);
    case ESectionAction.UpdateSectionError:
      return updateSectionError(state, action);*/
    /*case ESectionAction.UpdateSection:
      return updateCurrentSection(state, action);*/
    default:
      return state;
  }
};

/*
function updateSectionSucess(state: ISectionState, action: UpdateSectionSuccessAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.currentSection = null;
  return newState;
}
*/

/*
function updateSectionError(state: ISectionState, action: UpdateSectionErrorAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.currentSection = null;
  return newState;
}
*/

/*function updateCurrentSection(state: ISectionState, action: UpdateCurrentSectionAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.currentSection = null;
  return newState;
}*/

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
  };
}

