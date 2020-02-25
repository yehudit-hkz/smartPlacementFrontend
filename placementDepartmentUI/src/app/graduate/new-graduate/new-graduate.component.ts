import { Component, OnInit } from '@angular/core';
import { Graduate } from '../../classes/graduate';
import { MainService } from '../../services/main.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-new-graduate',
  templateUrl: './new-graduate.component.html',
  styleUrls: ['./new-graduate.component.scss']
})
export class NewGraduateComponent implements OnInit {

  constructor(private snackBar: MatSnackBar,public service: MainService) { }

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
        //temporary as well
      })
    )
    console.log(newGraduate);
  }
}
