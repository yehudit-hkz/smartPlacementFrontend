//  ngOnInit(){
//   console.log("in "+this.gId);
//   console.log("in "+this.jId);
// //  if(this.gId)
// //       this.GTS.GetCoordinationByGraduate(this.gId).subscribe(jobsCoordination=>
// //        {
//         //Assign the data to the data source for the table to render
//         this.jobsCoordination = new MatTableDataSource([new JobsCoordination()]);
//         console.log(this.jobsCoordination);
//         this.jobsCoordination.sort = this.sort;
//       // } ,
//       //  err=>{console.log(err);}
//       // );
// // if(this.jId)
// //       this.GTS.GetCoordinationByJob(this.jId).subscribe(jobsCoordination=>
// //        {
// //         //Assign the data to the data source for the table to render
// //         this.jobsCoordination = new MatTableDataSource(jobsCoordination);
// //         console.log(this.jobsCoordination);
// //         this.jobsCoordination.sort = this.sort;
// //       } ,
// //        err=>{console.log(err);}
// //       ); 
//     }
   
// }
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {JobsCoordination} from '../../classes/jobsCoordination';
import {JobCoordinationStatus} from '../../classes/my-enum-list';
import { MatTableDataSource, MatSort } from '@angular/material';
import { StamService } from '../../services/stam.service';
import { DeletionDialogComponent } from 'src/app/deletion-dialog/deletion-dialog.component';

@Component({
    selector: 'app-jobs-coordination',
    templateUrl: './jobs-coordination.component.html',
    styleUrls: ['./jobs-coordination.component.scss']
  })
  export class JobsCoordinationComponent implements OnInit {
  jobsCoordination: MatTableDataSource<JobsCoordination>;
  columnsToDisplay = ["jobSubject","candidateName","status","action","dateReceived","lastUpdateDate"];//,"action"];

  // @Input('graduateID') gId:string;   
  // @Input('jobID') jId:number;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  statusList:JobCoordinationStatus[]=[
  ];

  constructor(public GTS :StamService) { }

  ngOnInit() {
    let c=new JobsCoordination();
    c.Id=1234;
    c.status=this.statusList[0];
    c.dateReceived=new Date();
    c.lastUpdateDate=new Date();
    c.candidateFName="כע" ;
    c.candidateLName="כגעכגעגכעג" ;  
    //Assign the data to the data source for the table to render
       this.jobsCoordination = new MatTableDataSource([c,c,c,c]);
       console.log(this.jobsCoordination.data);
       this.jobsCoordination.sort = this.sort;
       this.jobsCoordination.filterPredicate=this.customFilterPredicate()

  }
  initializeList(itemName:string){
    console.log("initi");
        if(this.statusList.length==0)
          {
            //go to service
            this.statusList=[
              {Id:1,description:'aaaaa'},
              {Id:2,description:'bbbbb'},
              {Id:3,description:'ccccc'},
              {Id:4,description:'sssss'},
            ]
          }
    }
  updateStatus(jobsCoordinationForEdit:JobsCoordination): void {
    alert(jobsCoordinationForEdit.status.description);
    //go to service for edit
  }
  customFilterPredicate() {
    const myFilterPredicate = (data: JobsCoordination, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      return !searchString.value || data.status.Id==searchString.value;
    }
    return myFilterPredicate;
  }
 
   applyFilter(filterValue: string) {
     let filter={value:filterValue};
     this.jobsCoordination.filter =JSON.stringify(filter);

   }

}


