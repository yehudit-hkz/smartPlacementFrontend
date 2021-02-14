import { Component, OnInit, ViewChild } from '@angular/core';
import {MainService}from '../../services/main.service';
import {ListsService}from '../../services/lists.service';
import {Graduate, MainGraduate}from '../../classes/graduate';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { GraduateFilters } from '../../classes/filters';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

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
  graduates: MainGraduate[];
  columnsToDisplay = ['name',"expertise","branch","endYear","action"];
  resultsLength = 0;
  isLoadingResults = true;
  isNonResults = false;
  isRateLimitReached = false;
  panelList;
  filters:GraduateFilters;
  active;
  gender;
  didGraduate;
  hasDiploma;
  isWork;
  periodValue;
  maxDate=new Date();
  date = {begin: new Date(''), end: new Date('')}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public Mservice :MainService,
              public Lservice :ListsService){
    this.gender=[
      {Id:'זכר',name:'זכר'},
      {Id:'נקבה',name:'נקבה'}
  ];
  this.active=[
    {Id:true,name:'פעיל'},
    {Id:false,name:'לא פעיל'}
  ];
  this.didGraduate=[
    {Id:false,name:'לומד'},
    {Id:true,name:'בוגר'}
  ];
  this.hasDiploma=[
    {Id:true,name:'מדופלם'},
    {Id:false,name:'לא מדופלם'}
  ];
  this.isWork=[
    {Id:true,name:'עובד'},
    {Id:false,name:'לא עובד'}
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
          return this.Mservice.GetLazyList( "Graduate",
           this.getSortSTR() + ", ",
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
        this.graduates = data; 
        if(!this.panelList)
          this.panelList=[
          { name:"פעיל", sublist:this.active, selecedlist:[]},
          { name:"מגדר", sublist:this.gender, selecedlist:[]},
          { name:"בוגר", sublist:this.didGraduate, selecedlist:[]},
          { name:"מדופלם", sublist:this.hasDiploma, selecedlist:[]},
          { name:"עובד בתחום", sublist:this.isWork, selecedlist:[]},
          { name:"תקופה", sublist:[], selecedlist:[]},
          { name:"שלוחה", sublist:this.Lservice.branches, selecedlist:[]},
          { name:"תחום הכשרה", sublist:this.Lservice.expertises, selecedlist:[]},
        ];
      });
  }
  ngOnInit() {
        this.sort.active ='';
        this.sort.direction ='';
        this.paginator._intl.itemsPerPageLabel='פריטים לעמוד:'
        this.paginator._intl.nextPageLabel     = 'עמוד הבא';
        this.paginator._intl.previousPageLabel = 'עמוד הקודם';
        this.paginator._intl.getRangeLabel = this.Mservice.dutchRangeLabel;
   }
   
   applyFilter(filterValue: string) 
   {
      this.filters=new GraduateFilters();
      this.filters.name=filterValue;
      this.filters.active=this.panelList[0].selecedlist;
      this.filters.gender=this.panelList[1].selecedlist;
      this.filters.didGraduate=this.panelList[2].selecedlist;
      this.filters.hasDiploma=this.panelList[3].selecedlist;
      this.filters.isWork=this.panelList[4].selecedlist;
      this.filters.period=this.periodValue;
      if(this.filters.period==2)
      {
        this.filters.startDate =this.date.begin.toISOString(); 
        this.filters.endDate =this.date.end.toISOString();
      }
      this.filters.branch=this.panelList[6].selecedlist;
      this.filters.expertise=this.panelList[7].selecedlist;
      this.paginator.pageIndex = 0;
      merge().pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.Mservice.GetLazyList( "Graduate",
          this.getSortSTR() + ", ",
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
      ).subscribe(data =>this.graduates = data);
    }

    cleanPeriod(){
      this.periodValue='';
      this.date = {begin: null, end: null};
    }

   getSortSTR():string{
    switch (this.sort.active) {
      case 'name':
       return 'firstName '+this.sort.direction+', lastName '+this.sort.direction
      case "expertise":
        return 'Expertise.name '+this.sort.direction
      case "branch":
        return 'Branch.name '+this.sort.direction
      default:
        return this.sort.active+" "+this.sort.direction
    }
   }

 }
