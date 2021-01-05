import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { JobCoordinationFilters } from '../classes/filters';
import { JobsCoordination } from '../classes/jobsCoordination';
import { EnumListsService } from '../services/enum-lists.service';
import { ListsService } from '../services/lists.service';
import { MainService } from '../services/main.service';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-placements',
  templateUrl: './placements.component.html',
  styleUrls: ['./placements.component.scss']
})
  export class PlacementsComponent implements OnInit, AfterViewInit {

  jobsCoordination: JobsCoordination[];
  columnsToDisplay = ["jobId","jobSubject","companyName","candidateName","placementStatus","action","dateReceived","lastUpdateDate"];//,"action"];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  filters:JobCoordinationFilters;
  gender;
  panelList;
  periodValue;
  maxDate=new Date();
  date = {begin: new Date(''), end: new Date('')}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private snackBar:MatSnackBar,
    public Mservice :MainService,
    public Eservice :EnumListsService,
    public Lservice :ListsService,
    private authService: AuthService) { 
      this.gender=[
        {Id:'זכר',name:'זכר'},
        {Id:'נקבה',name:'נקבה'}
    ];
    }

  ngOnInit() {
    this.sort.active = "";
    this.sort.direction = "";
     this.paginator._intl.itemsPerPageLabel='פריטים לעמוד:'
     this.paginator._intl.nextPageLabel     = 'עמוד הבא';
     this.paginator._intl.previousPageLabel = 'עמוד הקודם';
     this.paginator._intl.getRangeLabel = this.Mservice.dutchRangeLabel;
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.Mservice.GetLazyList( "JobsCoordination",
          this.getSortSTR() + ", ",
          this.paginator.pageIndex,this.paginator.pageSize,
            this.filters);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalCount;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data =>{
        this.jobsCoordination = data; 
        if(!this.panelList)
        {
          this.panelList=[
          { name:"סטטוס", sublist:this.Eservice.jobCoordinationStatuses, selecedlist:[]},
          { name:"מגדר", sublist:this.gender, selecedlist:[]},
          { name:"שלוחה", sublist:this.Lservice.branches, selecedlist:[]},
          { name:"תקופה", sublist:[], selecedlist:[]},
          { name:"מקצוע", sublist:this.Lservice.subjects, selecedlist:[]},
        ];
        if(this.authService.user.Permission.Id == 1)
          this.panelList.push({ name:"משתמש", sublist:this.Lservice.users, selecedlist:[]})
      }
      });
  }

  applyFilter() {
    this.filters=new JobCoordinationFilters();
    this.filters.status=this.panelList[0].selecedlist;
    this.filters.gender=this.panelList[1].selecedlist;
    this.filters.branch=this.panelList[2].selecedlist;
    this.filters.period=this.periodValue;
    if(this.filters.period==2)
    {
      this.filters.startDate =this.date.begin.toISOString(); 
      this.filters.endDate =this.date.end.toISOString();
    }
    this.filters.subject=this.panelList[4].selecedlist;
    this.filters.user=this.panelList[5].selecedlist;
    this.paginator.pageIndex = 0;
   merge().pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.Mservice.GetLazyList( "JobsCoordination",
        this.getSortSTR() + ", ",
        this.paginator.pageIndex,this.paginator.pageSize,
          this.filters);
      }),
      map(data => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.totalCount;
        return data.items;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
        return observableOf([]);
      })
    ).subscribe(data =>
      this.jobsCoordination = data
      );
   }

   cleanPeriod(){
    this.periodValue='';
    this.date = {begin: null, end: null};
  }

  getSortSTR():string{
    switch (this.sort.active) {
      case 'jobSubject':
       return 'Job.Subject.name '+this.sort.direction;
      case "companyName":
        return 'Job.Contact.Company.name '+this.sort.direction;
      case "candidateName":
        return 'Graduate.firstName '+this.sort.direction+', Graduate.lastName '+this.sort.direction;
      default:
        return this.sort.active+" "+this.sort.direction
    }
   }

  updateStatus(jobsCoordinationForEdit:JobsCoordination): void {
    //go to service for edit
    jobsCoordinationForEdit.Status.description = this.Eservice.jobCoordinationStatuses.find(
      s=> s.Id == jobsCoordinationForEdit.Status.Id
      ).description;
    this.Mservice.Edit('JobsCoordination',jobsCoordinationForEdit).subscribe(res=>this.ngOnInit());
  }
 
}
