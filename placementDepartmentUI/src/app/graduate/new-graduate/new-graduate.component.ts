import { Component, OnInit } from '@angular/core';
import { Graduate } from '../../classes/graduate';
import { MainService } from '../../services/main.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DomSanitizer} from '@angular/platform-browser';
import { MatIconRegistry} from '@angular/material/icon';
import { Location } from '@angular/common';
import { IOerrorComponent } from 'src/app/messages/ioerror/ioerror.component';


@Component({
  selector: 'app-new-graduate',
  templateUrl: './new-graduate.component.html',
  styleUrls: ['./new-graduate.component.scss'],
})
export class NewGraduateComponent implements OnInit {

  importState:boolean;

  constructor(private location: Location,
    private snackBar: MatSnackBar,
    public dialog   :MatDialog,
    public service: MainService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
      this.importState = false;
      iconRegistry.addSvgIcon(
        'excel',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/excel.svg'));
     }

  ngOnInit() {  }

  addNewGraduate(newGraduate:Graduate){
    this.service.Save('Graduate', newGraduate)
      .subscribe(res => {
        this.snackBar.open("הבוגר נוסף בהצלחה!", "סגור", {
          duration: 6000,
          direction:"rtl",
        });
        const dialogRef = this.dialog.open(IOerrorComponent, {
          width: '500px',
          data: {type: 'I' , desc:"האם ברצונך לשלוח מייל הצטרפות עבור הבוגר החדש:", items:[res.firstName + ' ' +res.lastName]}
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed '+ result);
          if(result==true){
            this.snackBar.open("שולח...", "סגור", {
              duration: 360000,
              direction:"rtl",
            });  
            this.service.SendActiveMessage([res]).subscribe(res=>
              this.snackBar.open("המייל נשלח בהצלחה", "סגור", {
                duration: 6000,
                direction:"rtl",
              }) 
              );
          }
        this.location.back();
        });
      },
        err=>{
          if(err.error.ExceptionType == "System.Exception" 
          && err.error.ExceptionMessage == "Duplicate")
          this.snackBar.open('כבר קיים בוגר עם ת"ז זהה', "סגור", {
            duration: 8000,
            direction:"rtl",
            verticalPosition:'top',
            panelClass:"err-msg"
          });
      });
  }
  importFromExcel(){
    this.importState = true;
  }
}
