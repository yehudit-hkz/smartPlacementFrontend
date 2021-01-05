import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{Graduate}from '../../classes/graduate';
import{MainService}from '../../services/main.service';
import {MatDialog,MatSnackBar} from '@angular/material';
import{DeletionDialogComponent}from '../../messages/deletion-dialog/deletion-dialog.component';
import { Location } from '@angular/common';


@Component({
  selector: 'app-graduate-details',
  templateUrl: './graduate-details.component.html',
  styleUrls: ['./graduate-details.component.scss']
})
export class GraduateDetailsComponent implements OnInit {
  id:string;
  graduate:Graduate;

  constructor(
    private route:ActivatedRoute,
    public service :MainService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private location: Location
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>
    this.id=params.graduateID);
    this.service.GetByID('Graduate',this.id).subscribe(graduate=>
      {this.graduate=graduate;
      console.log(this.graduate)},
     err=>{console.log(err);}
    
     );
  }

  openDeletionDialog(): void {
    const dialogRef = this.dialog.open(DeletionDialogComponent, {
      width: '300px',
      data: {name: this.graduate.firstName+' '+this.graduate.lastName , type: "בוגר"}

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result==true){
        console.log(`Dialog result: ${result}`);
        this.service.Delete('Graduate',this.graduate.Id).subscribe(res => { 
          this.snackBar.open("הבוגר נמחק בהצלחה!", "סגור", {
            duration: 6000,
            direction:"rtl",
          });  
          this.location.back();
        });
      }
    });
  }
  openCVFile()
  {
    this.service.getCVFile(this.graduate.linkToCV).subscribe(stream=>
      {
        var blob = new Blob([stream], {type: "application/pdf"});
        var name = `${this.graduate.firstName} ${this.graduate.lastName}.pdf`;

        //- open in new tab 
        var objectUrl = URL.createObjectURL(blob);
        let w = window.open(objectUrl);
        w.addEventListener('load', function () {
            w.document.title = name;
        });

      },
     err=>{console.log(err);}
    );
  }
}
