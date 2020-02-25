import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{Graduate}from '../../classes/graduate';
import{MainService}from '../../services/main.service';
import {MatDialog,MatSnackBar} from '@angular/material';
import{DeletionDialogComponent}from '../../deletion-dialog/deletion-dialog.component';
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
      width: '250px',
      // data: {name: this.graduate.firstName+" "+this.graduate.lastName , type: "בוגר"}
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
        err=>{}
      }
    });
  }
//   openCVFile()
//   {
//     this.GTS.getFile(this.id).subscribe(blob=>
//       {
//         var newBlob = new Blob([blob], {type: "application/pdf"});
//         //- open in current tab 
//         // var link = document.createElement('a');
//         // link.download = "Je kar.pdf";
//         // link.href = URL.createObjectURL(newBlob);
//         // link.click();

//        //- open in other tab 
//         var objectUrl = URL.createObjectURL(newBlob);
//         window.open(objectUrl);
//       },
//      err=>{console.log(err);}
//     );
//     // this.GTS.getURLFile().subscribe(path=>
//     //   {
//     //     //- open in current tab 
//     //     // var link = document.createElement('a');
//     //     // link.download = "Je kar.pdf";
//     //     // link.href = this.GTS.baseURL+path;
//     //     // link.click();

//     //    //- open in other tab 
//     //     window.open("http://localhost:50748/"+path);
      
//     //   },
//     //  err=>{console.log(err);}
//     // );
//   }
}
