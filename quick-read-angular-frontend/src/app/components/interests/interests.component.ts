import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

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

  constructor(private router: Router, private formBuilder: FormBuilder,) { }

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

  public nextPage(){
    //this.router.navigate(['/profile-picture']);
  }

  public onSelectInterest() {
    this.interestCount++;
  }

  public onSubmit(){
    let selectedInterest: string = '';
    for (const c in this.interestsForm.controls) {
      const value = this.interestsForm.get(c).value;
      if (value && selectedInterest !== '') {
        selectedInterest += ',' + c;
      } else  if(value) {
        selectedInterest += c;
      }
      //dispatch something to ad this to the store
      console.log(selectedInterest);
    }

  }

}
