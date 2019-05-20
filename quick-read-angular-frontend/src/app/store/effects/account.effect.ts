import {catchError, map, mergeMap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Effect, Actions, ofType} from "@ngrx/effects";
import {AccountService} from "../../services/account.service";
import {
  CreateAccount,
  EProfileAction,
} from "../actions/account.actions";
import {EMPTY, of} from "rxjs";
import {qrAccount} from "../../models/Account";
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

}
