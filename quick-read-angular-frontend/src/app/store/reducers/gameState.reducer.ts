import * as _ from 'lodash';
import {GameState} from "../../models/GameState";
import {
  EGameStateAction,
  GameStateAction,
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
    default:
      return state;
  }
};

/*function updateGameState(state: IGameState, action: UpdateGameStateAction) {
  if(state == null) {
    state = createEmptyState();
  }
  let newState = _.cloneDeep(state);
  newState.gameState = action.payload;
  return newState;
}*/

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
  //newState.gameState = action.payload;
  return newState;
}

function createEmptyState(){
  return {
    gameState: null,
  };
}

