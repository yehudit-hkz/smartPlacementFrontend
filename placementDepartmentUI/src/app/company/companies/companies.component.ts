import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, City } from '../../classes/my-enum-list';
import { CompanyFilters } from '../../classes/filters';
import {Company} from '../../classes/company';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { MainService } from '../../services/main.service';
import { ListsService } from '../../services/lists.service';
import { DeletionDialogComponent } from '../../messages/deletion-dialog/deletion-dialog.component';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companies: MatTableDataSource<Company>;
  columnsToDisplay = ["name","city","address","subject","descriptiovOfActivity","action"];
  isLoadingResults = true;
  isRateLimitReached = false;
  filters:CompanyFilters;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public Mservice :MainService,
    public CCservice :CompanyService,
    public Lservice:ListsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    ) { 
      this.filters = new CompanyFilters();
    }

  ngOnInit() {
    this.isLoadingResults = true;
    this.CCservice.companiesObs.subscribe(companies=>
      {
       this.companies = new MatTableDataSource(companies);
       console.log(this.companies);
       this.companies.sort = this.sort;
       this.companies.sortingDataAccessor= (item, property) => {
        switch(property) {
          case 'city': return item.City.name;
          case 'subject': return item.Subject.name;
          default: return item[property];
        }
      };
       this.companies.paginator = this.paginator;
       this.companies.paginator._intl.itemsPerPageLabel='פריטים לעמוד:'
       this.companies.paginator._intl.nextPageLabel     = 'עמוד הבא';
       this.companies.paginator._intl.previousPageLabel = 'עמוד הקודם';
       this.companies.paginator._intl.getRangeLabel = this.Mservice.dutchRangeLabel;
       this.companies.filterPredicate=this.customFilterPredicate()

        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
     } ,
      err=>{
        console.log(err);
        
        this.isLoadingResults = false;
        // Catch if the API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
      }
     );
  }

  customFilterPredicate() {
      const myFilterPredicate = (data: Company, filter: string): boolean => {
        let searchString = JSON.parse(filter);
        return this.mytoString(data).toLowerCase().indexOf(searchString.value.trim().toLowerCase()) !== -1;
      }
      return myFilterPredicate;
    }
   
     applyFilter(filterValue: string) {
    
    this.Mservice.GetListByFilters("Company",this.filters).subscribe(companies=>
      {console.log(companies);
      this.companies.data=companies},
      err=>{console.log(err);}
     );
      let filter={value:filterValue};
        this.companies.filter=JSON.stringify(filter);
    //  this.companies.filter =filterValue;
       if (this.companies.paginator) {
         this.companies.paginator.firstPage();
       }
     }

     openDeletionDialog(company:Company): void {
    const dialogRef = this.dialog.open(DeletionDialogComponent, {
      width: '300px',
      data: {name: company.name , type: "חברה"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result==true){
        console.log(`Dialog result: ${result}`);
        this.CCservice.Delete('Company',company.Id).subscribe(res=>{
          this.companies.data = this.companies.data.filter(c=> c.Id != company.Id);
          this.snackBar.open("החברה נמחקה בהצלחה!", "סגור", {
            duration: 6000,
            direction:"rtl",
          });
        });        
      }
    });
  }

  mytoString(data:any) {
    let string="";
   Object.keys(data).forEach(k => {
     if(k=="City")
      string+=data[k].name;
    else if(k=="Subject")
      string+=data[k].name;
    else if(k=="descriptiovOfActivity")
      string+=""
    else string+=data[k]
   });
   return string;
 }

}