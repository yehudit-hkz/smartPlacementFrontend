import { Component, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
 
  export interface DialogData {
    type: string;
    name: string;
    sub: string;
  }


@Component({
  selector: 'app-deletion-dialog',
  templateUrl: './deletion-dialog.component.html',
  styleUrls: ['./deletion-dialog.component.scss']
})
export class DeletionDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}
}
