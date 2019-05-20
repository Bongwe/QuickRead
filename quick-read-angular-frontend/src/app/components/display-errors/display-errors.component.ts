import { Component, OnInit } from '@angular/core';
import {selectAccounts} from "../../store/selectors/profile.selectors";
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {IAccountState} from "../../store/reducers/profile.reducer";

@Component({
  selector: 'app-display-errors',
  templateUrl: './display-errors.component.html',
  styleUrls: ['./display-errors.component.css']
})
export class DisplayErrorsComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  errorFlag: boolean = false;
  successFlag: boolean = false;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.store.select(selectAccounts).subscribe((state: IAccountState) =>{
      if(state && state.accountError){
        this.errorMessage = state.accountError;
        this.errorFlag = true;
        this.successFlag = false;
      } else if (state && state.accountSuccess) {
        this.successMessage = state.accountSuccess;
        this.successFlag = true;
        this.errorFlag = false;
      }
    });
  }

  resetErrorFlag(){
    this.errorFlag = false;
  }

  resetSuccessFlag(){
    this.successFlag = false;
  }

}
