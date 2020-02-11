import { Component, OnInit ,Output, EventEmitter, Input, OnChanges} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import{Graduate}from '../../classes/graduate';

@Component({
  selector: 'app-graduate-form',
  templateUrl: './graduate-form.component.html',
  styleUrls: ['./graduate-form.component.scss']
})
export class GraduateFormComponent implements OnChanges,OnInit {
 @Input('graduateForEdit') graduate= new Graduate();
 @Output() submitGraduate= new EventEmitter<Graduate>();

  cities=["ירושלים","בני ברק"];
  graduateForm: FormGroup;
 
  constructor(private location: Location) { }
 ngOnInit(){
  console.log("in "+this.graduate);
   this.ngOnChanges();
 }
 
  ngOnChanges() {
    console.log("ch "+this.graduate);
    this.graduateForm = new FormGroup({
      Id: new FormControl(this.graduate.Id, [Validators.required,Validators.pattern('^([0-9]{9})$')]),
      gender: new FormControl(this.graduate.Gender, [Validators.required]),
      name: new FormControl(this.graduate.Name, [Validators.required]),
      city: new FormControl(this.graduate.City, [Validators.required]),
      email: new FormControl(this.graduate.Email, [Validators.required,Validators.email]),
      phone: new FormControl(this.graduate.Phone, [Validators.required,Validators.pattern("^([0-9]{9,15})$")]),
      IsWorking: new FormControl(this.graduate.IsWorking),
      IsInterested: new FormControl(this.graduate.IsInterested),
      // name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
       myDate: new FormControl(!this.graduate.myDate?new Date():this.graduate.myDate),
      // address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
  }
 
  public hasError = (controlName: string, errorName: string) =>{
    return this.graduateForm.controls[controlName].hasError(errorName);
  }
 
  public onCancel = () => {
    this.location.back();
  }
 
  public createGraduate = (ownerFormValue) => {
    if (this.graduateForm.valid) {
      this.executeGraduateCreation(ownerFormValue);
    }
  }
 
  private executeGraduateCreation = (graduateFormValue) => {
    let newGraduate=new Graduate();
        newGraduate.Id=graduateFormValue.Id;
        newGraduate.Name=graduateFormValue.name;
        newGraduate.City=graduateFormValue.city;
        newGraduate.Email=graduateFormValue.email;
        newGraduate.Phone=graduateFormValue.phone;
        newGraduate.IsInterested=graduateFormValue.IsInterested;
        newGraduate.IsWorking=graduateFormValue.IsWorking;
      //   newGraduate.LinkToCV=this.graduate.LinkToCV;
    this.submitGraduate.emit(newGraduate);
     this.location.back();

  }
}