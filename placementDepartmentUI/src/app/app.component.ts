import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ChangePasswordComponent } from './user/change-password/change-password.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  constructor( public authService: AuthService,
               private dialog: MatDialog,
               private snackBar: MatSnackBar,
               private router: Router ){

    authService.user = JSON.parse(localStorage.getItem('curr-user'));
    var datetime = JSON.parse(localStorage.getItem('expiry-date'));
    datetime = new Date(datetime);
    if(authService.user == null || datetime <= new Date()){
      authService.user = null;
      localStorage.setItem('returnUrl',window.location.pathname);
      this.router.navigate(['login']);
    }
    else{
      this.authService.getPages();
    }
  } 
  ChangeInitPassword(){
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '350px',
      data: '1'
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result != '' && result != undefined)
      {
      this.authService.ChangePass(this.authService.user.Id,false,result).subscribe(data=>
        this.snackBar.open("הסיסמה הוחלפה בהצלחה!", "סגור", {
          duration: 6000,
          direction:"rtl",
        })
      )}
      });
   } 
}
