import {catchError, map, mergeMap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Effect, Actions, ofType} from "@ngrx/effects";
import {AccountService} from "../../services/account.service";
import {
  AccountLoginAction,
  CreateAccountAction,
  EProfileAction,
} from "../actions/account.actions";
import {EMPTY, of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {SetSettingsSuccessAction} from "../actions/settings.actions";
import {AccountDTO} from "../../models/dto/AccountDTO";
import {Store} from "@ngrx/store";
import {IAppState} from "../state/app.state";
import {SetNotificationMessageAction} from "../actions/notofication.actions";
import {NotificationObj} from "../../models/NotificationObj";
import {SUCCESSFUL_LOGIN} from "../../models/Messages";

@Injectable()
export class AccountEffects {

  constructor(private store: Store<IAppState>,private actions$: Actions, private profileService: AccountService) {}

  @Effect()
  fetch$ = this.actions$
    .pipe(
      ofType(EProfileAction.GetAccounts),
      mergeMap(() => this.profileService.getAll()
        .pipe(
          map(accounts => ({ type: EProfileAction.GetAccountsSuccess, payload: accounts })),
          catchError(() => EMPTY)
        ))
    );

  @Effect()
  loadMovies$ = this.actions$
    .pipe(
      ofType(EProfileAction.CreateAccount),
      mergeMap((accounts: CreateAccountAction) => this.profileService.createAccount(accounts.payload)
        .pipe(
            map((result: AccountDTO) => {
              this.store.dispatch(new SetSettingsSuccessAction(result.settings));
              this.store.dispatch(new SetNotificationMessageAction(new NotificationObj("Account created successfully", true)));
              return {type: EProfileAction.CreateAccountSuccess, payload: result}
            }),
          catchError((error) => {
            this.store.dispatch(new SetNotificationMessageAction(new NotificationObj('It looks like your email address already exists', false, true)));
            return of({type: EProfileAction.CreateAccountError, payload: error});
          })
        ))
    );

  @Effect()
  updateAccount$ = this.actions$
    .pipe(
      ofType(EProfileAction.UpdateAccount),
      mergeMap((accounts: CreateAccountAction) => this.profileService.updateAccount(accounts.payload)
        .pipe(
          map((result: AccountDTO) => {
            //this.store.dispatch(new SetNotificationMessageAction(new NotificationObj('Account updated successfully', true)));
            return { type: EProfileAction.UpdateAccountSuccess, payload: result }
          }),
          catchError((error: HttpErrorResponse) => of({ type: EProfileAction.UpdateAccountError, payload: error}))
        ))
    );

  @Effect()
  accountLogin$ = this.actions$
    .pipe(
      ofType(EProfileAction.AccountLogin),
      mergeMap((accounts: AccountLoginAction) => this.profileService.accountLogin(accounts.payload)
        .pipe(
          map((result: AccountDTO) => {
            this.store.dispatch(new SetSettingsSuccessAction(result.settings));
            this.store.dispatch(new SetNotificationMessageAction(new NotificationObj(SUCCESSFUL_LOGIN, true)));
            return {type: EProfileAction.AccountLoginSuccess, payload: result.account}
          }),
          catchError((error) => {
            this.store.dispatch(new SetNotificationMessageAction(new NotificationObj('Invalid email or password', false, true)));
            return of({type: EProfileAction.AccountLoginError, payload: error});
          })
        ))
    );

}
