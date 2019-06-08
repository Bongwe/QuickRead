import {catchError, map, mergeMap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {Effect, Actions, ofType} from "@ngrx/effects";
import {of} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {IAppState} from "../state/app.state";
import {GameStateService} from "../../services/gameState.service";
import {EGameStateAction, UpdateGameStateAction} from "../actions/gameState.actions";
import {GameState} from "../../models/GameState";

@Injectable()
export class GameStateEffects {

  constructor(private store: Store<IAppState>,private actions$: Actions, private gameStateService: GameStateService
  ) {}

  @Effect()
  setSettings$ = this.actions$
    .pipe(
      ofType(EGameStateAction.UpdateGameState),
      mergeMap((updateGameStateAction: UpdateGameStateAction) => this.gameStateService.updateGameState(updateGameStateAction.payload)
        .pipe(
          map((gameState: GameState) => {
            /*let notification = new NotificationObj();
            notification.isError = false;
            notification.isSuccess = true;
            notification.message = "Game settings updated successfully";
            this.store.dispatch(new SetNotificationMessageAction(notification));*/
            return {type: EGameStateAction.UpdateGameStateSuccess, payload: gameState}
          }),
          catchError((error: HttpErrorResponse) => of({ type: EGameStateAction.UpdateGameStateError, payload: error}))
        ))
    );

}


