import {catchError, map, mergeMap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Effect, Actions, ofType} from "@ngrx/effects";
import {EMPTY, of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ESettingsAction, SetSettingsAction, SetSettingsSuccessAction} from "../actions/settings.actions";
import {SettingsService} from "../../services/settings.service";
import {SetNotificationMessageAction} from "../actions/notofication.actions";
import {AccountDTO} from "../../models/dto/AccountDTO";
import {EProfileAction} from "../actions/account.actions";
import {Store} from "@ngrx/store";
import {IAppState} from "../state/app.state";
import {Settings} from "../../models/Settings";
import {NotificationObj} from "../../models/NotificationObj";

@Injectable()
export class SettingsEffects {

  constructor(private store: Store<IAppState>,private actions$: Actions, private settingsService: SettingsService) {}

  @Effect()
  setSettings$ = this.actions$
    .pipe(
      ofType(ESettingsAction.SetSettings),
      mergeMap((settingsAction: SetSettingsAction) => this.settingsService.setSettings(settingsAction.payload)
        .pipe(
          map((settings: Settings) => {
            let notification = new NotificationObj();
            notification.isError = false;
            notification.isSuccess = true;
            notification.message = "Game settings updated successfully";
            this.store.dispatch(new SetNotificationMessageAction(notification));
            return {type: ESettingsAction.SetSettingsSuccess, payload: settings}
          }),
          catchError((error: HttpErrorResponse) => of({ type: ESettingsAction.SetSettingsError, payload: error}))
        ))
    );

}


