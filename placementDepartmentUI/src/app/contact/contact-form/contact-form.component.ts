import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StamService } from 'src/app/services/stam.service';
import { Contact } from 'src/app/classes/contact';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contact= new Contact();
 
  companyList=["ירושלים","בני ברק"];
  contactForm: FormGroup;
 
  constructor(private location: Location,
   private route:ActivatedRoute,
   public GTS :StamService,) { }
   
 ngOnInit(){
   this.route.params.subscribe((params)=>{
     if(params.contactID!='-')
         this.contact.Id=params.companyID
 });
 // if(this.company.Id)
 //   this.GTS.getCompanyByID(this.company.Id).subscribe(company=>
 //     this.company=company,
 //    err=>{console.log(err);}
 //   );
    this.contactForm = new FormGroup({
      name: new FormControl(this.contact.name, [Validators.required]),
      officePhone : new FormControl(this.contact.officePhone,[Validators.pattern("^([0-9]{9,10})$")]),
      phone: new FormControl(this.contact.phone, [Validators.pattern("^([0-9]{9,10})$")]),
      email: new FormControl(this.contact.email,[Validators.email]),
      Company: new FormControl(this.contact.CompanyId,[Validators.required]),
    });
  }
 
  public hasError = (controlName: string, errorName: string) =>{
    return this.contactForm.controls[controlName].hasError(errorName);
  }
 
  public onCancel = () => {
    this.location.back();
  }
 
  public createContact = (ownerFormValue) => {
    if (this.contactForm.valid) {
      this.executeContactCreation(ownerFormValue);
    }
  }
 
  private executeContactCreation = (contactFormValue) => {
    let newContact=new Contact();
    if(this.contact)
       newContact.Id=this.contact.Id;
       newContact.name=contactFormValue.name;
       newContact.officePhone=contactFormValue.officePhone;
       newContact.phone=contactFormValue.phone;
       newContact.email=contactFormValue.email;
       newContact.CompanyId=contactFormValue.Company;
     console.log(newContact);
     if(this.contact.Id)
      //edit function;
      console.log("adit");
     else// add new function;
       console.log("new");

      this.location.back();

  }


}
