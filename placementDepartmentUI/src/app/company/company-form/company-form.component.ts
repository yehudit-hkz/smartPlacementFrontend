import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import{Company}from '../../classes/company';
import { MainService } from 'src/app/services/main.service';
import { ListsService } from 'src/app/services/lists.service';
import { EnumListsService } from 'src/app/services/enum-lists.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  company= new Company();
  companyForm: FormGroup;
  
   constructor(private location: Location,
    private snackBar: MatSnackBar,
    private route:ActivatedRoute,
    public Mservice :MainService,
    public Lservice :ListsService,
    public Eservice :EnumListsService) {
      this.companyForm = new FormGroup({
        name: new FormControl("", [Validators.required]),
        subject: new FormControl("",[Validators.required]),
        city: new FormControl("",[Validators.required]),
        address: new FormControl(""),
        descriptiovOfActivity: new FormControl(""),
      });
     }
    
  ngOnInit(){
    this.route.params.subscribe((params)=>{
      if(params.companyID!='-')
          this.company.Id=params.companyID
  });
  if(this.company.Id)
    this.Mservice.GetByID('Company',this.company.Id).subscribe(company=>
     { this.company=company;
      this.companyForm = new FormGroup({
        name: new FormControl(this.company.name, [Validators.required]),
        subject: new FormControl(
         this.Lservice.subjects.find(s=>this.company.Subject.Id==s.Id),
         [Validators.required]),
        city: new FormControl(
         this.Eservice.cities.find(c=>this.company.City.Id==c.Id),
         [Validators.required]),
        address: new FormControl(this.company.address),
        descriptiovOfActivity: new FormControl(this.company.descriptiovOfActivity),
      });},
     err=>{console.log(err);}
    );
   }
  
   public hasError = (controlName: string, errorName: string) =>{
     return this.companyForm.controls[controlName].hasError(errorName);
   }
  
   public onCancel = () => {
     this.location.back();
   }
  
   public createCompany = (ownerFormValue) => {
     if (this.companyForm.valid) {
       this.executeCompanyCreation(ownerFormValue);
     }
   }

   private executeCompanyCreation = (companyFormValue) => {
     let newCompany=new Company();
     if(this.company)
         newCompany.Id=this.company.Id;
      newCompany.name=companyFormValue.name;
      newCompany.Subject=companyFormValue.subject;
      newCompany.City=companyFormValue.city;
      newCompany.address=companyFormValue.address;
      newCompany.descriptiovOfActivity=companyFormValue.descriptiovOfActivity;
      if(this.company.Id)
       //edit function;
       this.Mservice.Edit('Company',newCompany).subscribe(res => {
        this.snackBar.open("הפרטים עודכנו בהצלחה!", "סגור", {
          duration: 6000,
          direction:"rtl",
        });  
      },
      error => {
        //temporary as well
      }); 
      else
      // add new function;
      this.Mservice.Edit('Company',newCompany).subscribe(res => {
        this.snackBar.open("החברה נוספה בהצלחה!", "סגור", {
          duration: 6000,
          direction:"rtl",
        });  
      },
      (error => {
        //temporary as well
      })
    );
      this.location.back();
   }

}
