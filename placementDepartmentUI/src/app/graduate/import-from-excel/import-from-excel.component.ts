import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EnumListsService } from 'src/app/services/enum-lists.service';
import { ListsService } from 'src/app/services/lists.service';
import { MainService } from 'src/app/services/main.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { IOerrorComponent } from 'src/app/messages/ioerror/ioerror.component';

@Component({
  selector: 'app-import-from-excel',
  templateUrl: './import-from-excel.component.html',
  styleUrls: ['./import-from-excel.component.scss']
})
export class ImportFromExcelComponent implements OnInit {

  excelForm: FormGroup;

  constructor(private location: Location,
              private snackBar: MatSnackBar,
              public dialog   :MatDialog,
              public Mservice : MainService,
              public Lservice : ListsService,
              public Eservice : EnumListsService) {
    
    this.excelForm = new FormGroup({
      xlFile: new FormControl("",[Validators.required]),
      startLine: new FormControl("",[Validators.required]),
      endLine: new FormControl("",[Validators.required]),

      Id: new FormControl("", [Validators.required,Validators.pattern(/^[A-Z]*$/)]),
      gender: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required,Validators.pattern(/^[A-Z]*$/)]),
      firstName: new FormControl("", [Validators.required,Validators.pattern(/^[A-Z]*$/)]),
      dateOfBirth: new FormControl("",[Validators.required,Validators.pattern(/^[A-Z]*$/)]),
      address: new FormControl("", [Validators.pattern(/^[A-Z]*$/)]),
      zipCode: new FormControl("", [Validators.pattern(/^[A-Z]*$/)]),
      city: new FormControl("",[Validators.required,Validators.pattern(/^[A-Z]*$/)]),
      email: new FormControl("", [Validators.required,Validators.pattern(/^[A-Z]*$/)]),
      phone: new FormControl("", [Validators.required,Validators.pattern(/^[A-Z]*$/)]),

      branch: new FormControl("", [Validators.required]),
      expertise: new FormControl("",[Validators.required]),

      startYear: new FormControl("", [Validators.required,Validators.pattern(/^[A-Z]*$/)]),
      endYear: new FormControl("", [Validators.required,Validators.pattern(/^[A-Z]*$/)]),
      didGraduate: new FormControl(false),
      hasDiploma: new FormControl("", [Validators.required,Validators.pattern(/^[A-Z]*$/)]),
      isWorkerInProfession: new FormControl("", [Validators.pattern(/^[A-Z]*$/)]),
      companyName: new FormControl("", [Validators.pattern(/^[A-Z]*$/)]),
      role: new FormControl("", [Validators.pattern(/^[A-Z]*$/)]),
      placedByThePlacementDepartment: new FormControl("", [Validators.pattern(/^[A-Z]*$/)]),
      hasExperience: new FormControl("", [Validators.pattern(/^[A-Z]*$/)]),
    });
  }

  ngOnInit() {
    this.excelForm.controls["expertise"].valueChanges.subscribe(expertise=>{
      expertise = typeof(expertise) == "string" ? expertise : expertise.name;
      if(expertise != '')
      if(this.Lservice.expertises.findIndex(e=> e.name == expertise )==-1 ){
        this.excelForm.controls["expertise"].setErrors({invalidExpertise:true})  
      }
      else{
        this.excelForm.controls["expertise"].setErrors(null)
      }
    })
  }

  displayFn(item?: any): string | undefined {
    return item ? item.name : undefined;
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.excelForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public createGraduate = (FormValue) => {
   
    var map: { [field: string]: string; }={};
    map['Id'] = FormValue.Id; 
    map['gender'] = FormValue.gender;//*
    map['lastName'] = FormValue.lastName;
    map['firstName'] = FormValue.firstName;
    map['dateOfBirth'] = FormValue.dateOfBirth;
    map['address'] = FormValue.address;
    map['City'] = FormValue.city;
    map['zipCode'] = FormValue.zipCode;
    map['phone'] = FormValue.phone;
    map['email'] = FormValue.email;
    map['Branch'] = FormValue.branch;//*
    map['Expertise'] = FormValue.expertise.Id;//*
    map['startYear'] = FormValue.startYear;
    map['endYear'] = FormValue.endYear;
    map['didGraduate'] = FormValue.didGraduate;
    map['hasDiploma'] = FormValue.hasDiploma;
    map['isWorkerInProfession'] = FormValue.isWorkerInProfession;
    map['companyName'] = FormValue.companyName;
    map['role'] = FormValue.role;
    map['placedByThePlacementDepartment'] = FormValue.placedByThePlacementDepartment;
    map['hasExperience'] = FormValue.hasExperience;
    
    let formData = new FormData();
    formData.append("file", <File>FormValue.xlFile._files[0]);
    formData.append("data", JSON.stringify(map));
    formData.append("start", FormValue.startLine);
    formData.append("end", FormValue.endLine);

    this.Mservice.ImportGraduateFromExcel(formData).subscribe(
      async res => {
        if(res.errLine.length == 0)
        {
          console.log("Import Graduate From Excel is success"); 
          this.snackBar.open("כל השורות נוספו בהצלחה!", "סגור", {
            duration: 6000,
            direction:"rtl",
          }); 
        } 
        else{
          const EdialogRef = this.dialog.open(IOerrorComponent, {
            width: '300px',
            data: {type: 'E' , desc:"ארעה שגיאה בקריאה השורות:", items:res.errLine}
          });
          await EdialogRef.afterClosed().toPromise();
        }
        if (res.readLine.length > 0){
        const IdialogRef = this.dialog.open(IOerrorComponent, {
          width: '500px',
          data: {type: 'I' , desc:"האם ברצונך לשלוח מייל הצטרפות עבור הבוגרים החדשים:", items:res.readLine.map(g=> g.firstName + ' ' + g.lastName)}
        });
        IdialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed '+ result);
          if(result==true){
            this.snackBar.open("שולח...", "סגור", {
              duration: 360000,
              direction:"rtl",
            });  
            this.Mservice.SendActiveMessage(res.readLine).subscribe(async res=>{
              if(res.length == 0){
                this.snackBar.open("המיילים נשלחו בהצלחה", "סגור", {
                  duration: 6000,
                  direction:"rtl",
                }) 
              }
              else{
                const EdialogRef = this.dialog.open(IOerrorComponent, {
                  width: '300px',
                  data: {type: 'E' , desc:"ארעה שגיאה בשליחת המיילים עבור הבוגרים:", items:res}
                });
                await EdialogRef.afterClosed().toPromise();
              }
              this.onCancel();
            });
          }else{
            this.onCancel();
          }
        });
      }else{
        this.onCancel();
      }
    });
  }
}
