import { Component, OnInit, ViewChild ,AfterViewInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Job } from '../../classes/job';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { MainService } from '../../services/main.service';
import { JobFilters } from '../../classes/filters';
import { EnumListsService } from '../../services/enum-lists.service';
import { ListsService } from '../../services/lists.service';
import { DeletionDialogComponent } from '../../messages/deletion-dialog/deletion-dialog.component';
  import {merge, Observable, of as observableOf} from 'rxjs';
  import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
  

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class JobsComponent implements OnInit, AfterViewInit {

  jobs : Job[]; 
  columnsToDisplay = ['title', 'Subject.name', 'isActive', 'didSendCV','lastUpdateDate','action'];
  resultsLength = 0;
  isLoadingResults = true;
  isNonResults = false;    
  isRateLimitReached = false;
  expandedElement: Job | null;
  filters:JobFilters;
  panelList:any[];
  sendCV;
  active;
  periodValue;
  maxDate=new Date();
  date = {begin: new Date(''), end: new Date('')}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( 
    private snackBar:MatSnackBar,
    public dialog   :MatDialog,
    public Mservice :MainService,
    public Eservice :EnumListsService,
    public Lservice :ListsService,
    private authService: AuthService) 
    {
      this.sendCV=[
          {Id:true,name:'נשלחו'},
          {Id:false,name:'לא נשלחו'}
      ];
      this.active=[
        {Id:true,name:'פעילה'},
        {Id:false,name:'סגורה'}
    ];
  }
  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.Mservice.GetLazyList( "Job",
           this.sort.active+" "+this.sort.direction+", ",
            this.paginator.pageIndex,this.paginator.pageSize,
            this.filters);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.isNonResults = (data.totalCount === 0);
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
        this.jobs = data; 
        if(!this.panelList)
        {
          this.panelList=[
          { name:"שליחת מועמדים", sublist:this.sendCV, selecedlist:[]},
          { name:"פעילה", sublist:this.active, selecedlist:[]},
          { name:"סיבת סגירה", sublist:this.Eservice.reasonsForClosing, selecedlist:[]},
          { name:"תקופה", sublist:[], selecedlist:[]},
          { name:"מקצוע", sublist:this.Lservice.subjects, selecedlist:[]},
        ];
        if(this.authService.user.Permission.Id == 1)
          this.panelList.push({ name:"משתמש", sublist:this.Lservice.users, selecedlist:[]})
      }
      });
  }

  ngOnInit() {
      this.sort.active = "";
      this.sort.direction = "";
       this.paginator._intl.itemsPerPageLabel='פריטים לעמוד:'
       this.paginator._intl.nextPageLabel     = 'עמוד הבא';
       this.paginator._intl.previousPageLabel = 'עמוד הקודם';
       this.paginator._intl.getRangeLabel = this.Mservice.dutchRangeLabel;
     
  }

  applyFilter(){

    this.filters=new JobFilters();
    this.filters.sendCV=this.panelList[0].selecedlist;
    this.filters.active=this.panelList[1].selecedlist;
    this.filters.ReasonClosing=this.panelList[2].selecedlist;
    this.filters.period=this.periodValue;
    if(this.filters.period==2)
    {
      this.filters.startDate =this.date.begin.toISOString(); 
      this.filters.endDate =this.date.end.toISOString();
    }
    this.filters.subjects=this.panelList[4].selecedlist;
    this.filters.user=this.panelList[5].selecedlist;
    this.paginator.pageIndex = 0;
   merge().pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.Mservice.GetLazyList( "Job",
        this.sort.active+" "+this.sort.direction+", ",
          this.paginator.pageIndex,this.paginator.pageSize,
          this.filters);
      }),
      map(data => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.isNonResults = (data.totalCount === 0);
        this.resultsLength = data.totalCount;
        
        return data.items;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
        return observableOf([]);
      })
    ).subscribe(data =>this.jobs = data);
  }

cleanPeriod(){
  this.periodValue='';
  this.date = {begin: null, end: null};
}

openDeletionDialog(job:Job): void {
  const dialogRef = this.dialog.open(DeletionDialogComponent, {
    width: '300px',
    data: {name: job.title , type: "משרה"}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if(result==true){
      console.log(`Dialog result: ${result}`);
      this.Mservice.Delete('Job',job.Id).subscribe(res=>{
        this.jobs = this.jobs.filter(j=> j.Id != job.Id);
        this.snackBar.open("המשרה נמחקה בהצלחה!", "סגור", {
          duration: 6000,
          direction:"rtl",
        }); 
      })
    }
  });
}

}

