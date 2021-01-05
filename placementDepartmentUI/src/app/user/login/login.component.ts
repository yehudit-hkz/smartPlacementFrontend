import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListsService } from 'src/app/services/lists.service';
import { MainService } from 'src/app/services/main.service';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';
import { User } from 'src/app/classes/User';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;
  public loginInvalid: boolean;
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private Mservice :MainService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {  }

  ngOnInit() {
    this.returnUrl = localStorage.getItem('returnUrl');

    // //clear storage
    // localStorage.removeItem('curr-user');
    // this.authService.user=null;
    this.authService.logout(true);

    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    this.loginInvalid = false;
    if (this.form.valid) {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        this.authService.login(username, password).subscribe(
          data=> {
            localStorage.setItem('curr-user', JSON.stringify(data));
            var now = new Date();
            now.setHours(now.getHours()+7);
            localStorage.setItem('expiry-date', JSON.stringify(now) );
            this.authService.user=data;
            this.authService.getPages();
            this.returnUrl = this.returnUrl == "/login"? "/" : this.returnUrl
            this.router.navigate([this.returnUrl]);
            if(data.isInitialPassword == true)
              this.ChangeInitPassword(data);
          },
          err=> { 
            if (err.status == '401')
              this.loginInvalid = true;
           }
          )}
  }

  ChangeInitPassword(user:User){
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '350px',
      data: '0'
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result != '' && result != undefined)
      {
      this.authService.ChangePass(user.Id,false,result).subscribe(data=>
        this.snackBar.open("הסיסמה הוחלפה בהצלחה!", "סגור", {
          duration: 6000,
          direction:"rtl",
        })
      )}
      });
   }
}
