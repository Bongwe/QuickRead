import * as _ from 'lodash';
import {ESectionAction, ReadSectionAction, SectionAction} from "../actions/section.actions";
import {BookSection} from "../../models/BookSection";

export interface ISectionState {
  currentSection: BookSection;
}

export const initialSectionState: ISectionState = null;

export function sectionReducer (state = initialSectionState, action: SectionAction): ISectionState {
  switch (action.type) {
    case ESectionAction.ReadSection:
      return setCurrentSection(state, action);
    default:
      return state;
  }
};

function setCurrentSection(state: ISectionState, action: ReadSectionAction) {
  if(state == null) {
    state = {
      currentSection:  null,
    };
  }
  let newState = _.cloneDeep(state);
  newState.currentSection = action.payload;
  return newState;
}

