import {catchError, map, mergeMap, switchMap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Effect, Actions, ofType} from "@ngrx/effects";
import {ProfileService} from "../../services/profile.service";
import {Observable, of} from "rxjs";
import {EProfileAction, GetAccountsSuccess} from "../actions/profile.actions";
import {myAccount} from "../../models/Account";
import {Action} from "@ngrx/store/src/models";

@Injectable()
export class ProfileEffects {

  constructor(private actions$: Actions, private profileService: ProfileService) {}

 /* @Effect()
  protected fetch$: Observable<Action> = this.actions$
    .pipe(
      ofType(EProfileAction.GetAccounts),
      mergeMap(() => this.profileService.getAll()
        .pipe(
          map(movies => ({ type: EProfileAction.GetAccountsSuccess, payload: myAccount })),
          catchError(() => of({ type: EProfileAction.GetAccountsError}))
        ))
    );*/

  @Effect()
  protected fetch$: Observable<Action> = this.actions$
    .pipe(
      ofType(EProfileAction.GetAccounts),
      switchMap(() => this.profileService.getAll()),
      switchMap((something: myAccount[])=> {
        return of(new GetAccountsSuccess(something))
      })
    );
}
