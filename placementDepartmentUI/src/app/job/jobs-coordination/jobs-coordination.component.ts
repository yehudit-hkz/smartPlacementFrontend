import { Component, OnInit, ViewChild, Input, Output,EventEmitter} from '@angular/core';
import {JobsCoordination} from '../../classes/jobsCoordination';
import { MatTableDataSource, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { EnumListsService } from '../../services/enum-lists.service';
import { MainService } from 'src/app/services/main.service';
import { Location } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
    selector: 'app-jobs-coordination',
    templateUrl: './jobs-coordination.component.html',
    styleUrls: ['./jobs-coordination.component.scss'] 
  })
  export class JobsCoordinationComponent implements OnInit  {

  jobsCoordination: MatTableDataSource<JobsCoordination>;
  columnsToDisplay = ["jobId","jobSubject","companyName","candidateName","status","action","dateReceived","lastUpdateDate"];//,"action"];
  numOfInteresteds:number =0;

  selection = new SelectionModel<JobsCoordination>(true, []);


  @Input('graduateID') gId:string;   
  @Input('jobID') jId:number;
  @Output() sendCndidate = new EventEmitter();
  @Output() placed = new EventEmitter();

  
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  OK:boolean=false;
  constructor(public Eservice :EnumListsService,
    public Mservice:MainService,
    private dialog   :MatDialog,
    private snackBar: MatSnackBar,
    public location: Location) { 
      this.jobsCoordination = new MatTableDataSource();
        this.jobsCoordination.sort = this.sort;
        this.jobsCoordination.filterPredicate=this.customFilterPredicate()
    }

 ngOnInit(){
  console.log("in "+this.gId);
  console.log("in "+this.jId);
 if(this.gId)
      this.Mservice.GetCoordinationByGraduate(this.gId).subscribe(jobsCoordination=>
       {
        //Assign the data to the data source for the table to render
        this.jobsCoordination.data=jobsCoordination;
        console.log(this.jobsCoordination);
      } ,
       err=>{console.log(err);}
      );
  else if(this.jId)
      this.Mservice.GetCoordinationByJob(this.jId).subscribe(jobsCoordination=>
       {
        //Assign the data to the data source for the table to render
        this.jobsCoordination.data = jobsCoordination; //= new MatTableDataSource(jobsCoordination);
        console.log(this.jobsCoordination);
        this.numOfInteresteds=this.jobsCoordination.data.filter(jc=>jc.Status.Id == 2).length;
        } ,
       err=>{console.log(err);}
      ); 
    }
    
  updateStatus(jobsCoordinationForEdit:JobsCoordination): void {
    //go to service for edit
    jobsCoordinationForEdit.Status.description = this.Eservice.jobCoordinationStatuses.find(
      s=> s.Id == jobsCoordinationForEdit.Status.Id
      ).description;
    this.Mservice.Edit('JobsCoordination',jobsCoordinationForEdit).subscribe(res=>{
      this.ngOnInit();
      this.snackBar.open("הסטטוס עודכן בהצלחה!", "סגור", {
        duration: 6000,
        direction:"rtl",
      });  
    });

    if(jobsCoordinationForEdit.Status.Id == 6)//work
    this.placed.emit();

  }
 
 
  OKsend(){
    //filter Interesteds
    this.applyFilter(2);
    this.OK=true;
    this.columnsToDisplay.unshift('select')
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: JobsCoordination, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      return !searchString.value || data.Status.Id==searchString.value;
    }
    return myFilterPredicate;
  }
 
   applyFilter(filterValue: number) {
     let filter={value:filterValue};
     this.jobsCoordination.filter =JSON.stringify(filter);
   }

   //in OK send:
   //selction graduate.

   /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.jobsCoordination.filteredData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.jobsCoordination.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: JobsCoordination): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }

  SendCVToContact(Massege){
    this.snackBar.open("שולח...", "סגור", {
      duration: 360000,
      direction:"rtl",
    });  
    //go to func 'send CV' in Email cntrl.
    this.Mservice.sendCoordinations(Massege.replace(/(\\r\\n)|([\r\n])/gmi, '<br/>')
      ,this.selection.selected.filter(jc=> jc.linkToCV))//this.jobsCoordination.filteredData)
    .subscribe(res=>{
      console.log(res); 
      this.snackBar.open("הקורות חיים נשלחו בהצלחה!", "סגור", {
        duration: 6000,
        direction:"rtl",
      });
      this.ngOnInit();
      this.sendCndidate.emit();
      this.exitSend();
    });
  }
  
  exitSend(){
    this.columnsToDisplay.shift();
    this.selection.clear();
    this.applyFilter(0);
    this.OK=false;  
  }
}


