import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {SelectionModel } from '@angular/cdk/collections'
import { MatTableDataSource, MAT_DIALOG_DATA, MatSort, MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { MainService } from 'src/app/services/main.service';
import { Subject } from 'src/app/classes/my-enum-list';
import { Graduate } from 'src/app/classes/graduate';
import { ListsService } from 'src/app/services/lists.service';
import { EnumListsService } from 'src/app/services/enum-lists.service';
import { IOerrorComponent } from 'src/app/messages/ioerror/ioerror.component';

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

  CVFilter:boolean;
  graduateFilter:boolean;
  diplomFilter:boolean;
  experienceFilter:boolean;

  panellist;
  genderFilter: filter[] = [
    { value: 'זכר', active: false, name: 'זכר' },
    { value: 'נקבה', active: false, name: 'נקבה' },
  ];
  branchFilter: filter[]=[];
  areasFilter: filter[]=[];


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public Mservice:MainService,
    public Eservice:EnumListsService,
   public Lservice:ListsService,
   private snackBar: MatSnackBar,
   private dialog :MatDialog,
   public dialogRef: MatDialogRef<MatchJobCandidatesComponent>,
   @Inject(MAT_DIALOG_DATA) public data:MatchData) { 
    this.panellist=[
      { name:"מגדר",sublist:this.genderFilter},
      { name:"שלוחה",sublist:this.branchFilter},
      { name:"איזור מגורים",sublist:this.areasFilter},
  ];
    }

  ngOnInit() {
      this.Mservice.GetGraduateForJob(this.data.subject,this.data.job).subscribe(graduates=>
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
          this.Lservice.areas.forEach(a=>
            this.areasFilter.push({value:a,active:false,name:a}));
       } ,
        err=>{console.log(err);}
       );
  }
  customFilterPredicate() {
    const myFilterPredicate = (data: Graduate, filter: string): boolean => {
      let res =
          (!this.CVFilter || this.CVFilter === (data.linkToCV?true:false)) &&
          (!this.graduateFilter || this.graduateFilter === data.didGraduate) &&
          (!this.diplomFilter || this.diplomFilter === data.hasDiploma) &&
          (!this.experienceFilter || this.experienceFilter === data.hasExperience) &&
          (this.genderFilter.filter(gender => !gender.active).length === this.genderFilter.length ||
           this.genderFilter.filter(gender => gender.active).some(gender => gender.value === data.gender))&&
          (this.areasFilter.filter(area => !area.active).length === this.areasFilter.length ||
           this.areasFilter.filter(area => area.active).some(area => area.value === data.City.area))&&
          (this.branchFilter.filter(branch => !branch.active).length === this.branchFilter.length ||
           this.branchFilter.filter(branch => branch.active).some(branch => branch.value === data.Branch.Id));//&&
         
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
    this.snackBar.open("שולח...", "סגור", {
      duration: 360000,
      direction:"rtl",
    });
    this.Mservice.SaveCoordinations(this.data.job,this.selection.selected).subscribe(async res=>{
      this.dialogRef.close(true);
      if(res.length == 0){
        this.snackBar.open("המיילים נשלחו בהצלחה", "סגור", {
          duration: 6000,
          direction:"rtl",
        }) 
      }
      else{
        const EdialogRef = this.dialog.open(IOerrorComponent, {
          width: '300px',
          data: {type: 'E' , desc:"ארעה שגיאה בשליחת ההצעה עבור הבוגרים:", items:res}
        });
        await EdialogRef.afterClosed().toPromise();
      }
    });
  }
}
