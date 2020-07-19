import { Component, OnInit, ViewChild, Input, Output,EventEmitter} from '@angular/core';
import {JobsCoordination} from '../../classes/jobsCoordination';
import { MatTableDataSource, MatSort } from '@angular/material';
import { EnumListsService } from '../../services/enum-lists.service';
import { MainService } from 'src/app/services/main.service';
import {TextFieldModule} from '@angular/cdk/text-field';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'app-jobs-coordination',
    templateUrl: './jobs-coordination.component.html',
    styleUrls: ['./jobs-coordination.component.scss'] 
  })
  export class JobsCoordinationComponent implements OnInit  {

  jobsCoordination: MatTableDataSource<JobsCoordination>;
  columnsToDisplay = ["jobId","jobSubject","candidateName","status","action","dateReceived","lastUpdateDate"];//,"action"];
  numOfInteresteds:number =0;

  @Input('graduateID') gId:string;   
  @Input('jobID') jId:number;
  @Output() sendCndidate = new EventEmitter();

  
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  OK:boolean=false;
  constructor(public Eservice :EnumListsService,
    public Mservice:MainService,
    private location: Location) { 
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
        this.numOfInteresteds=this.jobsCoordination.data.filter(jc=>jc.Status.description=='נענה להצעה').length;
        } ,
       err=>{console.log(err);}
      ); 
    }
    
  updateStatus(jobsCoordinationForEdit:JobsCoordination): void {
    //go to service for edit
    this.Mservice.Edit('JobsCoordination',jobsCoordinationForEdit).subscribe(res=>{this.ngOnInit();},err=>this.Mservice.showServerError());
  }
  SendCVToContact(Massege){
    //go to func 'send CV' in Email cntrl.
    this.Mservice.sendCoordinations(Massege.replace(/(\\r\\n)|([\r\n])/gmi, '<br/>'),this.jobsCoordination.filteredData)
    .subscribe(res=>{
        console.log(res); 
        this.ngOnInit();
        this.sendCndidate.emit();
        this.applyFilter("");
      },err=>this.Mservice.showServerError());
    this.OK=false;
  }

  OKsend(){
    //filter Interesteds
    this.applyFilter("נענה להצעה");
    this.OK=true;
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: JobsCoordination, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      return !searchString.value || data.Status.description==searchString.value;
    }
    return myFilterPredicate;
  }
 
   applyFilter(filterValue: string) {
     let filter={value:filterValue};
     this.jobsCoordination.filter =JSON.stringify(filter);
   }

}


