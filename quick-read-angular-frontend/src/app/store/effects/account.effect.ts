import {switchMap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Effect, Actions, ofType} from "@ngrx/effects";
import {AccountService} from "../../services/account.service";
import {Observable, of} from "rxjs";
import {CreateAccount, EProfileAction, GetAccountsSuccess} from "../actions/account.actions";
import {qrAccount} from "../../models/Account";
import {Action} from "@ngrx/store/src/models";

@Injectable()
export class AccountEffects {

  constructor(private actions$: Actions, private profileService: AccountService) {}

  @Effect()
  protected fetch$: Observable<Action> = this.actions$
    .pipe(
      ofType(EProfileAction.GetAccounts),
      switchMap(() => this.profileService.getAll()),
      switchMap((something: qrAccount[])=> {
        return of(new GetAccountsSuccess(something))
      })
    );

  @Effect()
  protected create$: Observable<Action> = this.actions$
    .pipe(
      ofType(EProfileAction.CreateAccount),
      switchMap((createAccount: CreateAccount) => this.profileService.createAccount(createAccount.payload)),
      switchMap((payload: qrAccount)=> {
        console.log(payload);
        return null;
        //return of(new GetAccountsSuccess(something))
      })
    );
}
