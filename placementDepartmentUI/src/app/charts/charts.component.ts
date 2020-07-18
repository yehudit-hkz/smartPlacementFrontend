import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ListsService } from '../services/lists.service';
import { MainService } from '../services/main.service';

import {ElementRef, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ChartsDetails } from '../classes/chartDetails';
import { Branch } from '../classes/my-enum-list';
import { EnumListsService } from '../services/enum-lists.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class ChartsComponent implements OnInit {

  public barChartType: ChartType = 'bar';
  public barChartLabels: Label[];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'סדרה A' },
  ];
  public barChartLegend = true;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { 
      xAxes: [{ticks: {fontFamily: "'Varela Round', sans-serif"}}],
      yAxes: [{ticks: {fontFamily: "'Varela Round', sans-serif"}}] 
    },
    legend: {
      align:'end',
      labels: { 
        fontFamily: "'Varela Round', sans-serif",
        padding:40,
        boxWidth:12,
      }
    },
  };
  // public chartColors: Array<any> = [
  //   { // first color
  //     backgroundColor: 'rgba(225,10,24,0.2)',
  //     borderColor: 'rgba(225,10,24,0.2)',
  //     pointBackgroundColor: 'rgba(225,10,24,0.2)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(225,10,24,0.2)'
  //   },
  //   { // second color
  //     backgroundColor: 'rgba(77, 10, 15, 0.2)',
  //     borderColor: 'rgba(77, 10, 15, 0.2)',
  //     pointBackgroundColor: 'rgba(77, 10, 15, 0.2)',
  //     pointBorderColor: '#fff',
  //     pointHoverBackgroundColor: '#fff',
  //     pointHoverBorderColor: 'rgba(77, 10, 15, 0.2)'
  //   }];
  chartsDetails:ChartsDetails=new ChartsDetails();
  typeFormGroup: FormGroup;
  detailsFormGroup: FormGroup;
  minDate: Date = new Date(1999,12,1);
  maxDate: Date = new Date();
  autoLength;
  constructor(private _formBuilder: FormBuilder,
    private Lservice:ListsService,
    public Eservice:EnumListsService,
    private Mservice:MainService) { }
     

  ngOnInit() {
    this.typeFormGroup = this._formBuilder.group({
      type: ['', Validators.required]
    });
    this.detailsFormGroup = this._formBuilder.group({
      startDateValue:[],
      endDateValue:[],
      areas:[[]],
      branches:[[]],
    });
    // this.filteredBranches = this.branchCtrl.valueChanges.pipe(  //this.detailsFormGroup.controls["branches"].valueChanges.pipe(
    //   startWith(null),
    //   map((branch: string | null) => branch ? this._filter(branch) : this.Lservice.branches));
    //   this.branchCtrl.valueChanges.subscribe(res=>{this.autoLength=this._filter(res).length;})
  }
  
  public hasError = (controlName: string, errorName: string) =>{
    return this.typeFormGroup.controls[controlName].hasError(errorName);
  }

  // events chart
  initChart(){
    console.log();
    this.barChartLabels=this.Lservice.subjects.map(s=>s.name);  
    this.chartsDetails.type=this.typeFormGroup.value.type;
    if(this.chartsDetails.type in [1,3]){
    this.chartsDetails.start=this.detailsFormGroup.value.startDateValue!=null?
    this.detailsFormGroup.value.startDateValue.toISOString():
    new Date('2000-01-01').toISOString();
    this.chartsDetails.end=this.detailsFormGroup.value.endDateValue!=null?
    this.detailsFormGroup.value.endDateValue.toISOString():
    this.maxDate.toISOString();
    }
    if(this.chartsDetails.type==2){
      this.chartsDetails.branches=this.detailsFormGroup.value.branches!=null?this.detailsFormGroup.value.branches.map(b=>b.Id):[];
      this.chartsDetails.areas=this.detailsFormGroup.value.areas!=null?this.detailsFormGroup.value.areas:[];
    }
    this.Mservice.GetChart(this.chartsDetails)
    .subscribe(data=>
        {
          if(data==null)
            this.barChartData= [{ data: [], label: 'סדרה A' }];
          else this.barChartData=data;

        }
      );
   
  }
  // public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   // console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //   // console.log(event, active);
  // }
  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }
  
/////// outo complite with chips
  // branchCtrl = new FormControl();
  // filteredBranches:Observable<Branch[]>;

  // @ViewChild('brachInput',{static:false}) brachInput: ElementRef<HTMLInputElement>;
  
  // remove(fruit: string): void {
  //   const index = this.detailsFormGroup.value.branches.indexOf(fruit);

  //   if (index >= 0) {
  //     this.detailsFormGroup.value.branches.splice(index, 1);
  //   }
  // }

  // selected(event: MatAutocompleteSelectedEvent): void {
  //   console.log(event.option.viewValue);
  //   if(this.detailsFormGroup.value.branches==null)
  //   this.detailsFormGroup.value.branches=[];
  //   if(this.detailsFormGroup.value.branches==null)
  //   this.detailsFormGroup.value.branches=[];
  //  if(event.option.value!='X'){
  //   this.detailsFormGroup.value.branches.push(event.option.value);
  //   this.brachInput.nativeElement.value = "";
  //   this.branchCtrl.setValue("");
  // }
  // }

  // private _filter(value: string):Branch[]{
  //   const filterValue =  typeof(value)=="string" ? value.toLowerCase():"";
  //   return this.Lservice.branches.filter(fruit => fruit.name.toLowerCase().indexOf(filterValue) === 0);
  // }

  ////multi select with chips

  onBrachRemoved(branche: string) {
    const branches = this.detailsFormGroup.value.branches as string[];
    this.removeFirst(branches, branche);
    this.detailsFormGroup.setValue({["branches"]:branches}); // To trigger change detection
  }

  // private removeFirst<T>(array: T[], toRemove: T): void {
  //   const index = array.indexOf(toRemove);
  //   if (index !== -1) {
  //     array.splice(index, 1);
  //   }
  // }

  onAreaRemoved(area: string) {
    const areas = this.detailsFormGroup.value.areas as string[];
    this.removeFirst(areas, area);
    this.detailsFormGroup.setValue({["areas"]:areas}); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
 
}


