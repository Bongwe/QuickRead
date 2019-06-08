import * as _ from 'lodash';
import {GameState} from "../../models/GameState";
import {
  ClearGameStateAction,
  EGameStateAction,
  GameStateAction, GetGameStateAction, GetGameStateErrorAction,
  UpdateGameStateErrorAction,
  UpdateGameStateSuccessAction
} from "../actions/gameState.actions";

export interface IGameState {
  gameState: GameState;
}

export const initialGameState: IGameState = null;

export function gameStateReducer (state = initialGameState, action: GameStateAction): IGameState {
  switch (action.type) {
    /*case EGameStateAction.UpdateGameState:
      return updateGameState(state, action);*/
    case EGameStateAction.UpdateGameStateSuccess:
      return updateGameStateSuccess(state, action);
    case EGameStateAction.UpdateGameStateError:
      return updateGameStateError(state, action);
    case EGameStateAction.GetGameState:
      return getGameState(state, action);
    case EGameStateAction.GetGameStateError:
      return getGameStateError(state, action);
    case EGameStateAction.ClearGameState:
      return clearGameState(state, action);
    default:
      return state;
  }
};

function getGameStateError(state: IGameState, action: GetGameStateErrorAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  //newState.gameState = action.payload;
  return newState;
}

function getGameState(state: IGameState, action: GetGameStateAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.gameState = action.payload;
  return newState;
}

function updateGameStateSuccess(state: IGameState, action: UpdateGameStateSuccessAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.gameState = action.payload;
  return newState;
}

function updateGameStateError(state: IGameState, action: UpdateGameStateErrorAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  /*if(action.payload.status == 409){

  }*/
  newState.gameState = null;
  return newState;
}

function clearGameState(state: IGameState, action: ClearGameStateAction) {
  return null;
}

function createEmptyState(){
  return {
    gameState: null,
  };
}

