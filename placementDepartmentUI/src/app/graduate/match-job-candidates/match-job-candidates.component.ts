import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {SelectionModel } from '@angular/cdk/collections'
import { MatTableDataSource, MAT_DIALOG_DATA, MatSort } from '@angular/material';
import { MainService } from 'src/app/services/main.service';
import { Subject } from 'src/app/classes/my-enum-list';
import { Graduate } from 'src/app/classes/graduate';
import { ListsService } from 'src/app/services/lists.service';
import { EnumListsService } from 'src/app/services/enum-lists.service';

export interface MatchData {
  subject: number;
  job: number;
}
export interface filter {
  active: boolean;
  name: string;
  value: any;
}

@Component({
  selector: 'app-match-job-candidates',
  templateUrl: './match-job-candidates.component.html',
  styleUrls: ['./match-job-candidates.component.scss']
})
export class MatchJobCandidatesComponent implements OnInit {

  displayedColumns: string[] = ['select','name', 'expertise', 'City', 'endYear', 'hasExperience', 'hasCV'];
  dataSource:MatTableDataSource<Graduate>;
  selection = new SelectionModel<Graduate>(true, []);

  panellist;
  CVFilter: filter[] = [
    { value: true, active: false, name: 'יש' },
    { value: false, active: false, name: 'אין' },
  ];
  genderFilter: filter[] = [
    { value: 'זכר', active: false, name: 'זכר' },
    { value: 'נקבה', active: false, name: 'נקבה' },
  ];
  experienceFilter: filter[]=[
    { value: true, active: false, name: 'יש' },
    { value: false, active: false, name: 'אין' },
  ]
  branchFilter: filter[]=[];
  areasFilter: filter[]=[];
  // expertiseFilter: filter[]=[];


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public Mservice:MainService,
    public Eservice:EnumListsService,
   public Lservice:ListsService,
   @Inject(MAT_DIALOG_DATA) public data:MatchData) { 
    this.panellist=[
      { name:'קו"ח',sublist:this.CVFilter},
      { name:'ניסיון',sublist:this.experienceFilter},
      { name:"מגדר",sublist:this.genderFilter},
      { name:"שלוחה",sublist:this.branchFilter},
      { name:"איזור מגורים",sublist:this.areasFilter},
      // { name:"תחום הכשרה",sublist:this.expertiseFilter}
  ];
    }

  ngOnInit() {
      this.Mservice.GetGraduateForJob(this.data.subject,this.data.job).subscribe(graduates=>
      // this.Mservice.GetAllList('Graduate').subscribe(graduates=>
        {
         //Assign the data to the data source for the table to render
         this.dataSource = new MatTableDataSource(graduates);
         this.dataSource.sortingDataAccessor= (item, property) => {
          switch(property) {
            case 'name': return item.firstName +" "+ item.lastName;
            case 'expertise': return item.Expertise.name;
            case 'City': return item.City.name;
            default: return item[property];
          }
        };
        this.dataSource.sort = this.sort;
         this.dataSource.filterPredicate=this.customFilterPredicate();
         this.Lservice.branches.forEach(b=>
          this.branchFilter.push({value:b.Id,active:false,name:b.name}));
          this.Eservice.areas.forEach(a=>
            this.areasFilter.push({value:a,active:false,name:a}));
          // this.Lservice.expertise.forEach(e=>
          //   this.expertiseFilter.push({value:e.Id,active:false,name:e.name}));
       } ,
        err=>{console.log(err);}
       );
  }
  customFilterPredicate() {
    const myFilterPredicate = (data: Graduate, filter: string): boolean => {
      let res= (this.CVFilter.filter(has => !has.active).length === this.CVFilter.length ||
          this.CVFilter.filter(has => has.active).some(has => has.value === (data.linkToCV?true:false))) &&
          (this.genderFilter.filter(gender => !gender.active).length === this.genderFilter.length ||
             this.genderFilter.filter(gender => gender.active).some(gender => gender.value === data.gender))&&
             (this.areasFilter.filter(area => !area.active).length === this.areasFilter.length ||
             this.areasFilter.filter(area => area.active).some(area => area.value === data.City.area))&&
             (this.branchFilter.filter(branch => !branch.active).length === this.branchFilter.length ||
             this.branchFilter.filter(branch => branch.active).some(branch => branch.value === data.Branch.Id));//&&
            //  (this.expertiseFilter.filter(expertise => !expertise.active).length === this.expertiseFilter.length ||
            //  this.expertiseFilter.filter(expertise => expertise.active).some(expertise => expertise.value === data.Expertise.Id));
    
    if(this.selection.isSelected(data)&&res==false)
          this.selection.toggle(data);
    return res;
  }
    return myFilterPredicate;
  }
 
   applyFilter(filterValue: string) {
     let filter={value:filterValue};
     this.dataSource.filter =JSON.stringify(filter);
     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
     console.log(this.selection)
   }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Graduate): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }
  addCoordination(){
    this.Mservice.SaveCoordinations(this.data.job,this.selection.selected).subscribe(res=>this.Mservice.showServerError());
  }
}
