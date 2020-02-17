import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import{Contact}from '../../classes/contact'

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

  constructor(private route:ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.params.subscribe((params)=>
    this.companyId=params.companyID);
    let c=new Contact();
    c.name="jkhk";

    c.officePhone="7653";
    c.phone='12345';
    c.email="sd@gmail.com";
    let c1=new Contact();
    c1.name="erty";
    c1.officePhone="567890";
    c1.phone='1234567';
    c1.email="sdd@gmail.com";
    c.CompanyName=c1.CompanyName="heter"
    c.Id=c1.Id=12

    this.contacts = new MatTableDataSource([c,c1,c]);
    this.contacts.sort = this.sort;
       this.contacts.paginator = this.paginator;
       this.contacts.paginator._intl.itemsPerPageLabel='פריטים לעמוד:'
       this.contacts.paginator._intl.nextPageLabel     = 'עמוד הבא';
       this.contacts.paginator._intl.previousPageLabel = 'עמוד הקודם';
       this.contacts.paginator._intl.getRangeLabel = dutchRangeLabel;
  }

  applyFilter(filterValue: string) {
    this.contacts.filter =filterValue;
    if (this.contacts.paginator) {
      this.contacts.paginator.firstPage();
    }
  }

}
//for translate paginator label
const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 van ${length}`; }
  
  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} מתוך ${length}`;
}
