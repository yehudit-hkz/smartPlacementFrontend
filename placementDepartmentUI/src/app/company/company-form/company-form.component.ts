import { Component, OnInit ,Output, EventEmitter, Input, OnChanges} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import{Company}from '../../classes/company';
import { StamService } from 'src/app/services/stam.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  company= new Company();
 
   cities=["ירושלים","בני ברק"];
   companyForm: FormGroup;
  
   constructor(private location: Location,
    private route:ActivatedRoute,
    public GTS :StamService,) { }
    
  ngOnInit(){
    this.route.params.subscribe((params)=>{
      if(params.companyID!='-')
          this.company.Id=params.companyID
  });
  // if(this.company.Id)
  //   this.GTS.getCompanyByID(this.company.Id).subscribe(company=>
  //     this.company=company,
  //    err=>{console.log(err);}
  //   );
     this.companyForm = new FormGroup({
       name: new FormControl(this.company.name, [Validators.required]),
       subject : new FormControl(this.company.Subject,[Validators.required]),
       city: new FormControl(this.company.City, [Validators.required]),
       address: new FormControl(this.company.address),
       descriptiovOfActivity: new FormControl(this.company.descriptiovOfActivity),
     });
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
      console.log(newCompany);
      if(this.company.Id)
       //edit function;
       console.log("adit");
      else// add new function;
        console.log("new");

       this.location.back();
 
   }

}
