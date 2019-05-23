
import * as _ from 'lodash';
import {
  ClearNotificationMessage,
  ENotificationAction,
  QuickRead_NotificationAction,
  SetNotificationMessage
} from "../actions/notofication.actions";

export interface INotification {
  message: string;
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
      message: ''
    };
  }
  let newState = _.cloneDeep(state);
  newState.message = action.payload;
  return newState;
}

function clearNotification(state: INotification, action: ClearNotificationMessage) {
  if(state == null) {
    state = {
      message: null
    };
  }
  let newState = _.cloneDeep(state);
  newState.message = null;
  return newState;
}
