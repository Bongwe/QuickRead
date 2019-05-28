import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {IAppState} from "../store/state/app.state";
import {selectAccounts} from "../store/selectors/profile.selectors";
import {IAccountState} from "../store/reducers/profile.reducer";

@Injectable({providedIn: 'root'})

export class AuthService {

  private loggedIn: boolean = false;

  constructor(private store: Store<IAppState>) {
    this.store.select(selectAccounts).subscribe((state: IAccountState) =>{
      if(state && state.selectedAccount !== null){
       this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

}
