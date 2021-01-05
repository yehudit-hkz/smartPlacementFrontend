import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { MainService } from '../../services/main.service';
import { EnumListsService } from '../../services/enum-lists.service';
import { DeletionDialogComponent } from '../../messages/deletion-dialog/deletion-dialog.component';
import { User } from 'src/app/classes/User';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ListsService } from '../../services/lists.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: MatTableDataSource<User>;
  columnsToDisplay = ["name","email","Permission","isActive","action"];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public Mservice :MainService,
              public Lservice:ListsService,
              public Eservice:EnumListsService,
              public authService:AuthService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar
              ) { }

  ngOnInit() {
    this.Lservice.usersObs.subscribe(users=>
    {
      console.log(users);
      this.users = new MatTableDataSource(users);
      this.users.sort = this.sort;
      this.users.sortingDataAccessor= (item, property) => {
       switch(property) {
         case 'Permission': return item.Permission.description;
         default: return item[property];
       }
     };
      this.users.paginator = this.paginator;
      this.users.paginator._intl.itemsPerPageLabel='פריטים לעמוד:'
      this.users.paginator._intl.nextPageLabel     = 'עמוד הבא';
      this.users.paginator._intl.previousPageLabel = 'עמוד הקודם';
      this.users.paginator._intl.getRangeLabel = this.Mservice.dutchRangeLabel;
      this.users.filterPredicate=this.customFilterPredicate()
    } ,
     err=>{console.log(err);}
    );
 }

 customFilterPredicate() {
  const myFilterPredicate = (data: User, filter: string): boolean => {
    let searchString = JSON.parse(filter);
    return this.mytoString(data).toLowerCase().indexOf(searchString.value.trim().toLowerCase()) !== -1;
  }
  return myFilterPredicate;
}

applyFilter(filterValue: string) {
    
  let filter={value:filterValue};
    this.users.filter=JSON.stringify(filter);
//  this.companies.filter =filterValue;
   if (this.users.paginator) {
     this.users.paginator.firstPage();
   }
 }

 resetPassword(user:User){
  const dialogRef = this.dialog.open(ChangePasswordComponent, {
    width: '350px',
    data: user.name
  });
  dialogRef.afterClosed().subscribe(result =>{
    if(result != '' && result != undefined)
    {
    this.authService.ChangePass(user.Id,true,result).subscribe(data=>
      this.snackBar.open("הסיסמה אופסה בהצלחה!", "סגור", {
        duration: 6000,
        direction:"rtl",
      })
    )}
    });
 }

 openDeletionDialog(user:User): void {
  const dialogRef = this.dialog.open(DeletionDialogComponent, {
    width: '300px',
    data: {name: user.name , type: "משתמש"}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if(result==true){
      console.log(`Dialog result: ${result}`);
      this.Lservice.Delete('User',user.Id).subscribe(res=>{
        this.users.data = this.users.data.filter(u=> u.Id != user.Id);
        this.snackBar.open("המשתמש נמחק בהצלחה!", "סגור", {
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
   if(k=="Permission")
    string+=data[k].description;
  else string+=data[k]
 });
 return string;
}

}

 

    
     
  
   
     

   