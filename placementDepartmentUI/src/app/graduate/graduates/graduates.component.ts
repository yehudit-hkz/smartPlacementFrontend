import { Component, OnInit, ViewChild } from '@angular/core';
import {MainService}from '../../services/main.service';
import {ListsService}from '../../services/lists.service';
import {Graduate}from '../../classes/graduate';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

export interface filter {
  active: boolean;
  name: string;
  value: any;

}

@Component({
  selector: 'app-graduates',
  templateUrl: './graduates.component.html',
  styleUrls: ['./graduates.component.scss']
})
export class GraduatesComponent implements OnInit {
  graduates: MatTableDataSource<Graduate>;
  panellist;
  columnsToDisplay = ['Name',"Expertise","Branch","endYear","action"];

  activeFilter: filter[] = [
    { value: true, active: false, name: 'פעיל' },
    { value: false, active: false, name: 'לא פעיל' },
  ];
  genderFilter: filter[] = [
    { value: 'ז', active: false, name: 'זכר' },
    { value: 'נ', active: false, name: 'נקבה' },
  ];
  branchFilter: filter[]=[];
  expertiseFilter: filter[]=[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public Mservice :MainService,
   public Lservice:ListsService){
    this.panellist=[
      { name:"פעיל",sublist:this.activeFilter},
      { name:"מגדר",sublist:this.genderFilter},
      { name:"שלוחה",sublist:this.branchFilter},
      { name:"תחום הכשרה",sublist:this.expertiseFilter}
  ];
  }
  
  ngOnInit() {
      this.Mservice.GetAllList("Graduate").subscribe(graduates=>
       {
        //Assign the data to the data source for the table to render
        this.graduates = new MatTableDataSource(graduates);
        console.log(this.graduates);
        console.log(this.panellist);
        this.graduates.sort = this.sort;
        this.graduates.paginator = this.paginator;
        this.graduates.paginator._intl.itemsPerPageLabel='פריטים לעמוד:'
        this.graduates.paginator._intl.nextPageLabel     = 'עמוד הבא';
        this.graduates.paginator._intl.previousPageLabel = 'עמוד הקודם';
        this.graduates.paginator._intl.getRangeLabel = dutchRangeLabel;
        this.graduates.filterPredicate=this.customFilterPredicate()
      } ,
       err=>{console.log(err);}
      );
      this.Lservice.GetAllList('Branch').subscribe(res=>res.forEach(b=>
        this.branchFilter.push({value:b.Id,active:false,name:b.name})
        ));
        this.Lservice.GetAllList('Expertise').subscribe(res=>res.forEach(e=>
          this.expertiseFilter.push({value:e.Id,active:false,name:e.name})
          ));
   }
   
   customFilterPredicate() {
    const myFilterPredicate = (data: Graduate, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      return this.mytoString(data).toLowerCase().indexOf(searchString.value.trim().toLowerCase()) !== -1 &&
       (this.activeFilter.filter(isactive => !isactive.active).length === this.activeFilter.length ||
          this.activeFilter.filter(isactive => isactive.active).some(isactive => isactive.value === data.isActive)) &&
          (this.genderFilter.filter(gender => !gender.active).length === this.genderFilter.length ||
             this.genderFilter.filter(gender => gender.active).some(gender => gender.value === data.gender))&&
             (this.branchFilter.filter(branch => !branch.active).length === this.branchFilter.length ||
             this.branchFilter.filter(branch => branch.active).some(branch => branch.value === data.Branch.Id)) &&
             (this.expertiseFilter.filter(expertise => !expertise.active).length === this.expertiseFilter.length ||
             this.expertiseFilter.filter(expertise => expertise.active).some(expertise => expertise.value === data.Expertise.Id));
  }
    return myFilterPredicate;
  }
 
   applyFilter(filterValue: string) {
     let filter={value:filterValue};
     this.graduates.filter =JSON.stringify(filter);
     if (this.graduates.paginator) {
       this.graduates.paginator.firstPage();
     }
   }

   mytoString(data:any) {
    let string="";
   Object.keys(data).forEach(k => {
     string+=data[k]
   });
   return string;
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
