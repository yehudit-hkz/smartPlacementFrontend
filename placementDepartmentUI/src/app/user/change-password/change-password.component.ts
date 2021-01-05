import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm:FormGroup;
  title = 'שינוי סיסמה'

  constructor( @Inject(MAT_DIALOG_DATA) public name: string ) 
  {
    if(name != '0' && name != '1')
        this.title = "איתחול סיסמה - " + name;
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required,Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    })    
  }

  ngOnInit() {
    
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.passwordForm.controls[controlName].hasError(errorName);
  }

}
