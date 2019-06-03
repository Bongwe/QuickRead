import { Action } from '@ngrx/store';
import {NotificationObj} from "../../models/NotificationObj";

export enum ENotificationAction {
  SetNotificationMessage = '[Notification Component] Set notification message',
  ClearNotificationMessage = '[Notification Component] Clear notification message',
}

export class SetNotificationMessage implements Action {
  public readonly type = ENotificationAction.SetNotificationMessage;
  constructor(public payload: NotificationObj){
  }
}

export class ClearNotificationMessage implements Action {
  public readonly type = ENotificationAction.ClearNotificationMessage;
  constructor(){
  }
}

export type QuickRead_NotificationAction = SetNotificationMessage | ClearNotificationMessage;
