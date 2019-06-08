import { Action } from '@ngrx/store';
import {GameState} from "../../models/GameState";
import {HttpErrorResponse} from "@angular/common/http";

export enum EGameStateAction {
  UpdateGameState = '[GameState Component] Update game state',
  UpdateGameStateSuccess = '[GameState Component] Update game state success',
  UpdateGameStateError = '[GameState Component] Update game state error'
}

export class UpdateGameStateAction implements Action {
  readonly type = EGameStateAction.UpdateGameState;
  constructor(public payload: GameState){
  }
}

export class UpdateGameStateSuccessAction implements Action {
  readonly type = EGameStateAction.UpdateGameStateSuccess;
  constructor(public payload: GameState){
  }
}

export class UpdateGameStateErrorAction implements Action {
  readonly type = EGameStateAction.UpdateGameStateError;
  constructor(public payload: HttpErrorResponse){
  }
}

export type GameStateAction = UpdateGameStateAction | UpdateGameStateErrorAction | UpdateGameStateSuccessAction;
