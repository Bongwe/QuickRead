import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {IAppState} from "../../store/state/app.state";
import {AddAccountInterests} from "../../store/actions/account.actions";

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {

  selectedInterests: boolean = false;
  interestCount: number;
  minInterests: number = 3;
  interestsForm: FormGroup;
  selectedInterest: string = '';

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private store: Store<IAppState>) { }

  ngOnInit() {
    this.interestsForm = this.formBuilder.group({
      Classic: null,
      Crime: null,
      Fantasy: null,
      Mythology: null,
      Thriller: null,
      Fable: null,
      Comics: null,
      Paranormal: null,
      Horror: null,
    });
  }

  public onSelectInterest() {
    this.interestCount++;
  }

  public onSubmit(){
    for (const c in this.interestsForm.controls) {
      const value = this.interestsForm.get(c).value;
      if (value && this.selectedInterest !== '') {
        this.selectedInterest += ',' + c;
      } else  if(value) {
        this.selectedInterest += c;
      }
    }
    this.nextPage();
  }

  public nextPage(){
    this.store.dispatch( new AddAccountInterests(this.selectedInterest) );
    this.router.navigate(['/profile-picture']);
  }

}
