import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Job } from '../../classes/job';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { MainService } from '../../services/main.service';
import { JobFilters } from '../../classes/filters';
import { EnumListsService } from '../../services/enum-lists.service';
import { ListsService } from '../../services/lists.service';
import { DeletionDialogComponent } from 'src/app/deletion-dialog/deletion-dialog.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class JobsComponent implements OnInit {

  jobs : MatTableDataSource<Job>;
  columnsToDisplay = ['title', 'Subject', 'isActive', 'didSendCV','lastUpdateDate','action'];
  expandedElement: Job | null;
  filters:JobFilters;
  panelList;
  sendCV;
  active;
  dates;
  periodValue;
  startDateValue;
  endDateValue;
  maxDate=new Date();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public Mservice :MainService,
    public Eservice:EnumListsService,
    public Lservice:ListsService) {
      this.filters=new JobFilters();
      this.filters.subjects=[3];
      this.sendCV=[
          {Id:true,name:'נשלחו'},
          {Id:false,name:'לא נשלחו'}
      ];
      this.active=[
        {Id:true,name:'פעילה'},
        {Id:false,name:'סגורה'}
    ];
  }

  ngOnInit() {
    this.Mservice.GetAllList("Job").subscribe(graduates=>
      {
       //Assign the data to the data source for the table to render
       this.jobs = new MatTableDataSource(graduates);
       console.log(this.jobs);
       this.jobs.sortingDataAccessor= (item, property) => {
        switch(property) {
          case 'Subject': return item.Subject.name;
          default: return item[property];
        }
      };
       this.jobs.sort = this.sort;
       this.jobs.paginator = this.paginator;
       this.jobs.paginator._intl.itemsPerPageLabel='פריטים לעמוד:'
       this.jobs.paginator._intl.nextPageLabel     = 'עמוד הבא';
       this.jobs.paginator._intl.previousPageLabel = 'עמוד הקודם';
       this.jobs.paginator._intl.getRangeLabel = this.Mservice.dutchRangeLabel;
      //  this.jobs.filterPredicate=this.customFilterPredicate()
      this.panelList=[
        { name:"שליחת מועמדים", sublist:this.sendCV, selecedlist:[]},
        { name:"פעילה", sublist:this.active, selecedlist:[]},
        { name:"תקופה", sublist:[], selecedlist:[]},
        { name:"מקצוע", sublist:this.Lservice.subjects, selecedlist:[]},
      ];
       console.log(this.panelList);
     } ,
      err=>{console.log(err);}
     );
    
  }
  applyFilter(filterValue:string){
    this.filters.sendCV=this.panelList[0].selecedlist;
    this.filters.active=this.panelList[1].selecedlist;

    this.filters.period=this.periodValue;
    if(!this.endDateValue)this.endDateValue = new Date();
    if(!this.startDateValue)this.startDateValue = this.endDateValue;
    this.filters.startDate =this.startDateValue.toISOString(); 
    this.filters.endDate =this.endDateValue.toISOString();

    this.filters.subjects=this.panelList[3].selecedlist;

      this.Mservice.GetListByFilters("Job",this.filters).subscribe(jobs=>
       {console.log(this.jobs);
        this.jobs.data=jobs;},
      err=>{console.log(err);}
     );
  }

  openDeletionDialog(job:Job): void {
    const dialogRef = this.dialog.open(DeletionDialogComponent, {
      width: '250px',
      data: {name: job.title , type: "משרה"}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result==true){
        console.log(`Dialog result: ${result}`);
        this.Mservice.Delete('Job',job.Id).subscribe(res=>{});
        this.snackBar.open("המשרה נמחק בהצלחה!", "סגור", {
          duration: 6000,
          direction:"rtl",
        });  
      }
    });
  }

}

