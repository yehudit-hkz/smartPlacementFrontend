import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MainService } from 'src/app/services/main.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { User } from 'src/app/classes/User';
import { EnumListsService } from 'src/app/services/enum-lists.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ListsService } from 'src/app/services/lists.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userId;
  user = new User();
  userForm: FormGroup;

  constructor(private location: Location,
              private route:ActivatedRoute,
              public Mservice :MainService,
              public Eservice :EnumListsService,
              public Lservice :ListsService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) 
    {
      this.userForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('',[Validators.required,Validators.email]),
        permission: new FormControl('',[Validators.required]),
        isActive: new FormControl('')
      });
     }

     ngOnInit(){
      this.route.params.subscribe((params)=>{
         if(params.userID!='-')
             this.userId=params.userID;
      });
      if(this.userId)
       this.Mservice.GetByID('User',this.userId).subscribe(user=>
         {
           this.user = user;
          this.userForm = new FormGroup({
            name: new FormControl(user.name, [Validators.required]),
            email: new FormControl(user.email,[Validators.required,Validators.email]),
            permission: new FormControl(
              this.Eservice.permissions.find(p=>this.user.Permission.Id==p.Id)
              ,[Validators.required]),
            isActive: new FormControl(user.isActive)
          });
        });
      }

      public hasError = (controlName: string, errorName: string) =>{
        return this.userForm.controls[controlName].hasError(errorName);
      }
     
      public onCancel = () => {
        this.location.back();
      }
     
      public createUser = (ownerFormValue) => {
        if (this.userForm.valid) {
          this.executeContactCreation(ownerFormValue);
        }
      }
     
      private executeContactCreation = (contactFormValue) => {
        let newUser=new User();
        if(this.user)
            newUser.Id=this.user.Id;
        newUser.name=contactFormValue.name;
        newUser.email=contactFormValue.email;
        newUser.Permission=contactFormValue.permission;
        newUser.isActive=contactFormValue.isActive;
         if(this.user.Id)
           //edit function;
           this.Lservice.edit('User',newUser).subscribe(res => {
            this.snackBar.open("הפרטים עודכנו בהצלחה!", "סגור", {
              duration: 6000,
              direction:"rtl",
            });  
          this.location.back();
        },
        err=>{
          if(err.error.ExceptionType == "System.Exception" 
          && err.error.ExceptionMessage == "Duplicate")
          this.snackBar.open('כבר קיים משתמש עם דוא"ל זהה', "סגור", {
            duration: 8000,
            direction:"rtl",
            verticalPosition:'top',
            panelClass:"err-msg"
          });
        }); 
          else{
          //init password
          const dialogRef = this.dialog.open(ChangePasswordComponent, {
            width: '350px',
            data: newUser.name
          });
          dialogRef.afterClosed().subscribe(result =>{
          if(result != '' && result != undefined)
            // add new ;
            this.Lservice.NewUser(result,newUser).subscribe(res => {
              this.snackBar.open("המשתמש נוסף בהצלחה!", "סגור", {
                duration: 6000,
                direction:"rtl",
              });  
              this.location.back();
              },
              err=>{
                if(err.error.ExceptionType == "System.Exception" 
                && err.error.ExceptionMessage == "Duplicate")
                this.snackBar.open('כבר קיים משתמש עם דוא"ל זהה', "סגור", {
                  duration: 8000,
                  direction:"rtl",
                  verticalPosition:'top',
                  panelClass:"err-msg"
                });
              });
          else  
            this.snackBar.open("לא ניתן ליצור משתמש ללא סיסמה", "סגור", {
              duration: 8000,
              direction:"rtl",
              verticalPosition:'top',
              panelClass:"err-msg"
            }); 
        })
      }
    }
}