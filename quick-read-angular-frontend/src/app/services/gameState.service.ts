import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {qrAccount} from "../models/Account";
import {environment} from "../../environments/environment";
import {Settings} from "../models/Settings";
import {GameState} from "../models/GameState";
import {BookShelf} from "../models/BookShelf";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})

export class GameStateService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient){}

  /*updateGameState(gameState: GameState) {
    //let url = this.baseUrl + '/api/v1/settings/set';
    //return this.http.post<any>(url, settings)
  }*/

  updateGameState(gameState: GameState): Observable<GameState> {
    let url = this.baseUrl + '/api/v1/gameState/update';
    return this.http.post<any>(url, gameState)
  }

  getGameState(gameState: GameState): Observable<GameState> {
    let url = this.baseUrl + '/api/v1/gameState/get';
    return this.http.post<any>(url, gameState)
  }
}
