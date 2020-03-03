import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, City } from 'src/app/classes/my-enum-list';
import {Company} from '../../classes/company';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { MainService } from '../../services/main.service';
import { ListsService } from '../../services/lists.service';
import { DeletionDialogComponent } from 'src/app/deletion-dialog/deletion-dialog.component';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companies: MatTableDataSource<Company>;
  columnsToDisplay = ["name","city","address","subject","descriptiovOfActivity","action"];

  subjecFilter:Subject;
  subjecByJobsFilter:Subject;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public Mservice :MainService,
    public Lservice:ListsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit() {
    this.Mservice.GetAllList('Company').subscribe(companies=>
      {
       this.companies = new MatTableDataSource(companies);
       console.log(this.companies);
       this.companies.sort = this.sort;
       this.companies.paginator = this.paginator;
       this.companies.paginator._intl.itemsPerPageLabel='פריטים לעמוד:'
       this.companies.paginator._intl.nextPageLabel     = 'עמוד הבא';
       this.companies.paginator._intl.previousPageLabel = 'עמוד הקודם';
       this.companies.paginator._intl.getRangeLabel = dutchRangeLabel;
       this.companies.filterPredicate=this.customFilterPredicate()
     } ,
      err=>{console.log(err);}
     );
  }

  customFilterPredicate() {
      const myFilterPredicate = (data: Company, filter: string): boolean => {
        let searchString = JSON.parse(filter);
        return (this.mytoString(data).toLowerCase().indexOf(searchString.value.trim().toLowerCase()) !== -1) &&
       (!this.subjecFilter && !this.subjecByJobsFilter)||
        (!!this.subjecFilter && data.Subject.Id==this.subjecFilter.Id) ||
        // //this filter will be by to the jobs of contact of this company 
         (!!this.subjecByJobsFilter && data.Subject.Id==this.subjecByJobsFilter.Id);

      }
      return myFilterPredicate;
    }
   
     applyFilter(filterValue: string) {
    let filter={value:filterValue};
       this.companies.filter =JSON.stringify(filter);
       if (this.companies.paginator) {
         this.companies.paginator.firstPage();
       }
     }

     openDeletionDialog(company:Company): void {
    const dialogRef = this.dialog.open(DeletionDialogComponent, {
      width: '250px',
      data: {name: company.name , type: "חברה"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result==true){
        console.log(`Dialog result: ${result}`);
        this.Mservice.Delete('Company',company.Id).subscribe(res=>{});
        this.snackBar.open("החברה נמחקה בהצלחה!", "סגור", {
          duration: 6000,
          direction:"rtl",
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
    else string+=data[k]
   });
   return string;
 }

}


const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 מתוך ${length}`; }
  
  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} מתוך ${length}`;
}
