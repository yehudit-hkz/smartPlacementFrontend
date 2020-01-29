import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{Graduate}from '../classes/graduate';
import{StamService}from '../services/stam.service';
import {MatDialog} from '@angular/material/dialog';
import{DeletionDialogComponent}from '../deletion-dialog/deletion-dialog.component';
import { from } from 'rxjs';

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
    public GTS :StamService,
    public dialog: MatDialog
    ) {}

  ngOnInit() {
    this.route.params.subscribe((params)=>
    this.id=params.graduateID);
    this.GTS.getGraduateByID(this.id).subscribe(graduate=>
      this.graduate=graduate,
     err=>{console.log(err);}
    );
  }

  openDeletionDialog(): void {
    const dialogRef = this.dialog.open(DeletionDialogComponent, {
      width: '250px',
      data: {name: this.graduate.Name , type: "בוגר"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result==true)
      console.log(`Dialog result: ${result}`);
      //remove and go back to the list
    });
  }
}
