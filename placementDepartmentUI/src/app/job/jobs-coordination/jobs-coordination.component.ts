import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {JobsCoordination} from '../../classes/jobsCoordination';
import { MatTableDataSource, MatSort } from '@angular/material';
import { EnumListsService } from '../../services/enum-lists.service';
import { MainService } from 'src/app/services/main.service';

@Component({
    selector: 'app-jobs-coordination',
    templateUrl: './jobs-coordination.component.html',
    styleUrls: ['./jobs-coordination.component.scss']
  })
  export class JobsCoordinationComponent implements OnInit {

  jobsCoordination: MatTableDataSource<JobsCoordination>;
  columnsToDisplay = ["jobId","jobSubject","candidateName","status","action","dateReceived","lastUpdateDate"];//,"action"];

  @Input('graduateID') gId:string;   
  @Input('jobID') jId:number;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(public Eservice :EnumListsService,
    public Mservice:MainService) { }

 ngOnInit(){
  console.log("in "+this.gId);
  console.log("in "+this.jId);
 if(this.gId)
      this.Mservice.GetCoordinationByGraduate(this.gId).subscribe(jobsCoordination=>
       {
        //Assign the data to the data source for the table to render
        this.jobsCoordination = new MatTableDataSource(jobsCoordination);
        console.log(this.jobsCoordination);
        this.jobsCoordination.sort = this.sort;
        this.jobsCoordination.filterPredicate=this.customFilterPredicate()
      } ,
       err=>{console.log(err);}
      );
  else if(this.jId)
      this.Mservice.GetCoordinationByJob(this.jId).subscribe(jobsCoordination=>
       {
        //Assign the data to the data source for the table to render
        this.jobsCoordination = new MatTableDataSource(jobsCoordination);
        console.log(this.jobsCoordination);
        this.jobsCoordination.sort = this.sort;
        this.jobsCoordination.filterPredicate=this.customFilterPredicate()
      } ,
       err=>{console.log(err);}
      ); 
    }
  updateStatus(jobsCoordinationForEdit:JobsCoordination): void {
    alert(jobsCoordinationForEdit.Status.description);
    //go to service for edit
    this.Mservice.Edit('JobsCoordination',jobsCoordinationForEdit).subscribe(res=>{});
  }
  customFilterPredicate() {
    const myFilterPredicate = (data: JobsCoordination, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      return !searchString.value || data.Status.Id==searchString.value;
    }
    return myFilterPredicate;
  }
 
   applyFilter(filterValue: string) {
     let filter={value:filterValue};
     this.jobsCoordination.filter =JSON.stringify(filter);
   }

}


