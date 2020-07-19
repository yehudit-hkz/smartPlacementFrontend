import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import{Contact}from '../../classes/contact'
import { MainService } from 'src/app/services/main.service';
import { DeletionDialogComponent } from 'src/app/deletion-dialog/deletion-dialog.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  companyId;
  contacts: MatTableDataSource<Contact>;
  columnsToDisplay = ['name',"officePhone","phone","email","action"];
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route:ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public Mservice: MainService) { 
  }

  ngOnInit() {
    this.route.params.subscribe((params)=>
    this.companyId=params.companyID);
    this.Mservice.GetContactsByCompany(this.companyId).subscribe(
      contacts=>{
        this.contacts = new MatTableDataSource(contacts);
        this.contacts.sort = this.sort;
           this.contacts.paginator = this.paginator;
           this.contacts.paginator._intl.itemsPerPageLabel='פריטים לעמוד:'
           this.contacts.paginator._intl.nextPageLabel     = 'עמוד הבא';
           this.contacts.paginator._intl.previousPageLabel = 'עמוד הקודם';
           this.contacts.paginator._intl.getRangeLabel = this.Mservice.dutchRangeLabel;}
    )
  }

  applyFilter(filterValue: string) {
  //  this.contacts.data[0].companyName
    this.contacts.filter =filterValue;
    if (this.contacts.paginator) {
      this.contacts.paginator.firstPage();
    }
  }
  openDeletionDialog(contact:Contact): void {
    const dialogRef = this.dialog.open(DeletionDialogComponent, {
      width: '300px',
      data: {name: contact.name , type: "איש קשר", sub:'המשרות שהציע'}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result==true){
        console.log(`Dialog result: ${result}`);
        this.Mservice.Delete('Contact',contact.Id).subscribe(res=>{
          this.contacts.data = this.contacts.data.filter(c=> c.Id != contact.Id);
          this.snackBar.open("האיש קשר נמחק בהצלחה!", "סגור", {
            duration: 6000,
            direction:"rtl",
          });  
        },
        err=>this.Mservice.showServerError());
        
      }
    });
  }

}
