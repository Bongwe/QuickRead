import {catchError, map, mergeMap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Effect, Actions, ofType} from "@ngrx/effects";
import {AccountService} from "../../services/account.service";
import {
  AccountLoginAction,
  CreateAccount,
  EProfileAction,
} from "../actions/account.actions";
import {EMPTY, of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class AccountEffects {

  constructor(private actions$: Actions, private profileService: AccountService) {}

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
      mergeMap((accounts: CreateAccount) => this.profileService.createAccount(accounts.payload)
        .pipe(
          map(result => ({ type: EProfileAction.CreateAccountSuccess, payload: result })),
          catchError((error: HttpErrorResponse) => of({ type: EProfileAction.CreateAccountError, payload: error}))
        ))
    );

  @Effect()
  updateAccount$ = this.actions$
    .pipe(
      ofType(EProfileAction.UpdateAccount),
      mergeMap((accounts: CreateAccount) => this.profileService.updateAccount(accounts.payload)
        .pipe(
          map(result => ({ type: EProfileAction.UpdateAccountSuccess, payload: result })),
          catchError((error: HttpErrorResponse) => of({ type: EProfileAction.UpdateAccountError, payload: error}))
        ))
    );

  @Effect()
  accountLogin$ = this.actions$
    .pipe(
      ofType(EProfileAction.AccountLogin),
      mergeMap((accounts: AccountLoginAction) => this.profileService.accountLogin(accounts.payload)
        .pipe(
          map(result => ({ type: EProfileAction.AccountLoginSuccess, payload: result })),
          catchError((error: HttpErrorResponse) => of({ type: EProfileAction.AccountLoginError, payload: error}))
        ))
    );

}
