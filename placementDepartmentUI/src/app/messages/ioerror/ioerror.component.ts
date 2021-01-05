import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  type:string;
  desc: string;
  items: any[];
}

@Component({
  selector: 'app-ioerror',
  templateUrl: './ioerror.component.html',
  styleUrls: ['./ioerror.component.scss']
})
export class IOerrorComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

}
