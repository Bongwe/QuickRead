import {Settings} from "../../models/Settings";
import {
  ESettingsAction,
  SetSettingsErrorAction,
  SetSettingsSuccessAction,
  SettingsAction
} from "../actions/settings.actions";

import * as _ from 'lodash';

export interface ISettingsState {
  settings: Settings;
}

export const initialSettingsState: ISettingsState = null;

export function settingsReducer (state = initialSettingsState, action: SettingsAction): ISettingsState {
  switch (action.type) {
    /*case ESettingsAction.SetSettings:
      return setSettings(state, action);*/
    case ESettingsAction.SetSettingsSuccess:
      return setSettingsSuccess(state, action);
    case ESettingsAction.SetSettingsError:
      return setSettingsError(state, action);
    default:
      return state;
  }
};

/*
function setSettings(state: ISettingsState, action: SetSettingsAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.settings = action.payload;
  return newState;
}
*/

function setSettingsSuccess(state: ISettingsState, action: SetSettingsSuccessAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.settings = action.payload;
  return newState;
}

function setSettingsError(state: ISettingsState, action: SetSettingsErrorAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  //do something with the error on the payload
  newState.settings = null;
  return newState;
}

function createEmptyState(){
  return {
    settings: null,
  };
}

