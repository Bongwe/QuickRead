import { Action } from '@ngrx/store';
import {Settings} from "../../models/Settings";
import {HttpErrorResponse} from "@angular/common/http";

export enum ESettingsAction {
  SetSettings = '[Settings Component] Set settings',
  SetSettingsSuccess = '[Settings Component] Set settings success',
  SetSettingsError = '[Settings Component] Set settings error',
  ClearSettings = '[Settings Component] Clear settings'
}

export class ClearSettingsAction implements Action {
  readonly type = ESettingsAction.ClearSettings;
}


export class SetSettingsAction implements Action {
  readonly type = ESettingsAction.SetSettings;
  constructor(public payload: Settings){
  }
}

export class SetSettingsSuccessAction implements Action {
  readonly type = ESettingsAction.SetSettingsSuccess;
  constructor(public payload: Settings){
  }
}

export class SetSettingsErrorAction implements Action {
  readonly type = ESettingsAction.SetSettingsError;
  constructor(public payload: HttpErrorResponse){
  }
}

export type SettingsAction = SetSettingsAction | SetSettingsSuccessAction | SetSettingsErrorAction | ClearSettingsAction;
