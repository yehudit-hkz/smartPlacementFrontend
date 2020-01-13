import { Component, OnInit, ViewChild } from '@angular/core';
import {StamService}from '../services/stam.service';
import {Graduate}from '../classes/graduate';

import { from } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-graduates',
  templateUrl: './graduates.component.html',
  styleUrls: ['./graduates.component.scss']
})
export class GraduatesComponent implements OnInit {
  graduates: MatTableDataSource<Graduate>;
  columnsToDisplay = ['Name',"City","action"];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(public GTS :StamService){
    // this.graduates=new MatTableDataSource<Graduate>();
  }
 
 
  
   ngOnInit() {
      this.GTS.GetAllGraduates().subscribe(graduates=>
       {
        //Assign the data to the data source for the table to render
        this.graduates = new MatTableDataSource(graduates);
        console.log(this.graduates);
        this.graduates.sort = this.sort;
        this.graduates.paginator = this.paginator;
        this.graduates.paginator._intl.itemsPerPageLabel='פריטים לעמוד:'
        this.graduates.paginator._intl.nextPageLabel     = 'עמוד הבא';
        this.graduates.paginator._intl.previousPageLabel = 'עמוד הקודם';
        this.graduates.paginator._intl.getRangeLabel = dutchRangeLabel;
      } ,
       err=>{console.log(err);}
      );
      
   }
 
   applyFilter(filterValue: string) {
     this.graduates.filter = filterValue.trim().toLowerCase();
 
     if (this.graduates.paginator) {
       this.graduates.paginator.firstPage();
     }
   }
 }
 

//for translate paginator label
const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 van ${length}`; }
  
  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} מתוך ${length}`;
}
