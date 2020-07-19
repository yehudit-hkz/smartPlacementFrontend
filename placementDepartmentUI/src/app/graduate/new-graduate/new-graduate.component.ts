import { Component, OnInit } from '@angular/core';
import { Graduate } from '../../classes/graduate';
import { MainService } from '../../services/main.service';
import { MatSnackBar } from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';


@Component({
  selector: 'app-new-graduate',
  templateUrl: './new-graduate.component.html',
  styleUrls: ['./new-graduate.component.scss']
})
export class NewGraduateComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    public service: MainService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'excel',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/excel.svg'));
     }

  ngOnInit() {
  }
  addNewGraduate(newGraduate:Graduate){
    this.service.Save('Graduate', newGraduate)
      .subscribe(res => {
        this.snackBar.open("הבוגר נוסף בהצלחה!", "סגור", {
          duration: 6000,
          direction:"rtl",
        });  
      },
      (error => {
        this.service.showServerError()      
      })
    );
    console.log(newGraduate);
  }
  importFromExcel(){
    alert("importFromExcel ")
  }
}
