import { Action } from '@ngrx/store';
import {GameState} from "../../models/GameState";
import {HttpErrorResponse} from "@angular/common/http";

export enum EGameStateAction {
  UpdateGameState = '[GameState Component] Update game state',
  UpdateGameStateSuccess = '[GameState Component] Update game state success',
  UpdateGameStateError = '[GameState Component] Update game state error',
  GetGameState = '[GameState Component] Get game state',
  GetGameStateSuccess = '[GameState Component] Get game state success',
  GetGameStateError = '[GameState Component] Get game state error',
  ClearGameState = '[GameState Component] Get game clear state'
}

export class GetGameStateSuccessAction implements Action {
  readonly type = EGameStateAction.GetGameStateSuccess;
  constructor(public payload: GameState){
  }
}

export class ClearGameStateAction implements Action {
  readonly type = EGameStateAction.ClearGameState;
}

export class GetGameStateErrorAction implements Action {
  readonly type = EGameStateAction.GetGameStateError;
  constructor(public payload: GameState){
  }
}

export class GetGameStateAction implements Action {
  readonly type = EGameStateAction.GetGameState;
  constructor(public payload: GameState){
  }
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

export type GameStateAction = UpdateGameStateAction | UpdateGameStateErrorAction | UpdateGameStateSuccessAction
  | GetGameStateAction | GetGameStateErrorAction | ClearGameStateAction | GetGameStateSuccessAction;
