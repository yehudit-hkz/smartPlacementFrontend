import { Component, OnInit, ViewChild } from '@angular/core';
import {Company} from '../../classes/company'
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { StamService } from '../../services/stam.service';
import { Subject, City } from 'src/app/classes/my-enum-list';
import { DeletionDialogComponent } from 'src/app/deletion-dialog/deletion-dialog.component';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companies: MatTableDataSource<Company>;
  columnsToDisplay = ["name","address","city","subject","descriptiovOfActivity","action"];

  subjectList:Subject[]=[
  ];
  subjecFilter:Subject;
  subjecByJobsFilter:Subject;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public GTS :StamService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    ) {
      this.subjectList=[
        {Id:1,name:'aaaaa'},
        {Id:2,name:'bbbbb'},
        {Id:3,name:'ccccc'},
        {Id:4,name:'sssss'},
      ]
     }

  ngOnInit() {
    // this.GTS.getCMPN().subscribe(companies=>
    //   {
    //     if(companies==null)
    let c=new Company();
    c.Id=1234;
    c.name="dfdffgfgfgd"
    c.descriptiovOfActivity="קבוצת יעל היא קבוצת IT מהמובילות בישראל, המתמחה בפתרונות עסקיים מבוססי טכנולוגיה ועוסקת ביישום והטמעה של מגוון מוצרי תוכנה וחומרה מהמובילים בעולם. פעילות הקבוצה כוללת פרויקטי אינטגרציה, יישום מערכות ERP ו-CRM, הטמעת פתרונות פיננסיים, BI ואנליטיקה, פתרונות ענן, דיגיטל וניהול תוכן ומסמכים. זאת לצד ניסיון רב במתן שירותי מיקור חוץ, ייעוץ והדרכה. "
    let c1=new Company();
    c1.Id=12345;
    c1.descriptiovOfActivity="חברת ISR Corp מציעה ללקוחותיה פתרונות ויישומים מתקדמים, הנותנים פתרון טוב ויעיל , למגוון רחב של לקוחות. המערכת מבוססת על מספר מוצרי מדף הניתנים להתאמה במהירות וביעילות. החברה מספקת את מוצריה למגוון פלחי השוק השונים."  
    let c2=new Company();
    c2.Id=12346;
    c2.descriptiovOfActivity="בית תוכנה בתחום הרפואי"
    let c3=new Company();
    c3.Id=12347;
    c.Subject=c1.Subject={Id:2,name:'bbbbb'};
    c2.Subject=c3.Subject={Id:1,name:'aaaaa'};
    c3.descriptiovOfActivity= "בוגרת המרכז החרדי ממגמת הנדסאי אדריכלות שפתחה עסק עצמאי"
    //Assign the data to the data source for the table to render
       this.companies = new MatTableDataSource([c3,c,c1,c2]);
       console.log(this.companies);
       this.companies.sort = this.sort;
       this.companies.paginator = this.paginator;
       this.companies.paginator._intl.itemsPerPageLabel='פריטים לעמוד:'
       this.companies.paginator._intl.nextPageLabel     = 'עמוד הבא';
       this.companies.paginator._intl.previousPageLabel = 'עמוד הקודם';
       this.companies.paginator._intl.getRangeLabel = dutchRangeLabel;
     this.companies.filterPredicate=this.customFilterPredicate()
    //  } ,
    //   err=>{console.log(err);}
    //  );
    
  }
  initializeList(){
    console.log("initi");
        if(this.subjectList.length==0)
          {
            //go to service
            this.subjectList=[
              {Id:1,name:'aaaaa'},
              {Id:2,name:'bbbbb'},
              {Id:3,name:'ccccc'},
              {Id:4,name:'sssss'},
            ]
          }
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
        //remove
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
