
import * as _ from 'lodash';
import {
  ClearNotificationMessage,
  ENotificationAction,
  QuickRead_NotificationAction,
  SetNotificationMessage
} from "../actions/notofication.actions";
import {NotificationObj} from "../../models/NotificationObj";

export interface INotification {
  notification: NotificationObj;
}

export const initialNotificationState: INotification = null;

export function notificationReducer (state = initialNotificationState, action: QuickRead_NotificationAction): INotification {
  switch (action.type) {
    case ENotificationAction.SetNotificationMessage:
      return setNotification(state, action);
    case ENotificationAction.ClearNotificationMessage:
      return clearNotification(state, action);
    default:
      return state;
  }
};

function setNotification(state: INotification, action: SetNotificationMessage) {
  if(state == null) {
    state = {
      notification: null
    };
  }
  let newState = _.cloneDeep(state);
  newState.notification = action.payload;
  return newState;
}

function clearNotification(state: INotification, action: ClearNotificationMessage) {
  if(state == null) {
    state = {
      notification: null
    };
  }
  let newState = _.cloneDeep(state);
  newState.notification = null;
  return newState;
}
