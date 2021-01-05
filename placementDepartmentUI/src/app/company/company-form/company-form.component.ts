import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import{Company}from '../../classes/company';
import { MainService } from 'src/app/services/main.service';
import { ListsService } from 'src/app/services/lists.service';
import { EnumListsService } from 'src/app/services/enum-lists.service';
import { MatSnackBar } from '@angular/material';
import { CompanyService } from 'src/app/services/company.service';

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
    public CCservice :CompanyService,
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
    this.CCservice.GetCompanyByID(this.company.Id).subscribe(company=>
     { 
      this.company = company;
      this.companyForm = new FormGroup({
        name: new FormControl(this.company.name, [Validators.required]),
        subject: new FormControl(
         this.Lservice.subjects.find(s=>this.company.Subject.Id==s.Id),
         [Validators.required]),
        city: new FormControl(
         this.Lservice.cities.find(c=>this.company.City.Id==c.Id),
         [Validators.required]),
        address: new FormControl(this.company.address),
        descriptiovOfActivity: new FormControl(this.company.descriptiovOfActivity),
      });
    });
    this.onList();
   }

   displayFn(item?: any): string | undefined {
    return item ? item.name : undefined;
  }

  onList(){
    this.companyForm.controls["city"].valueChanges.subscribe(city=>{
      city = typeof(city) == "string" ? city : city.name;
      if(city != '')     
      if( this.Lservice.cities.findIndex(c=> c.name == city )==-1 ){
        this.companyForm.controls["city"].setErrors({invalidCity:true})  
      }
      else{
        this.companyForm.controls["city"].setErrors(null)
      }
    })
    this.companyForm.controls["subject"].valueChanges.subscribe(subject=>{
      subject = typeof(subject) == "string" ? subject : subject.name;
      if(subject != '')
      if( this.Lservice.subjects.findIndex(s=> s.name == subject ) == -1 ){
        this.companyForm.controls["subject"].setErrors({invalidSubject:true})  
      }
      else{
        this.companyForm.controls["subject"].setErrors(null)
      }
    })
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
       this.CCservice.Edit('Company',newCompany).subscribe(res => {
        this.snackBar.open("הפרטים עודכנו בהצלחה!", "סגור", {
          duration: 6000,
          direction:"rtl",
        }); 
      this.location.back();
      }); 
      else
      // add new function;
      this.CCservice.Save('Company',newCompany).subscribe(res => {
        this.snackBar.open("החברה נוספה בהצלחה!", "סגור", {
          duration: 6000,
          direction:"rtl",
        });  
      });
   }
}
