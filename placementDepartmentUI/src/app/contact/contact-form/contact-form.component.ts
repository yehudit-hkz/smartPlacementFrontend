import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StamService } from 'src/app/services/stam.service';
import { Contact } from 'src/app/classes/contact';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MainService } from 'src/app/services/main.service';
import { Company } from 'src/app/classes/company';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactId;
  contact= new Contact();
  companyList:Company[];
  contactForm: FormGroup;
 
  constructor(private location: Location,
   private route:ActivatedRoute,
   public Mservice :MainService,
   public snackBar: MatSnackBar) {
     this.companyList=[];
     this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      officePhone : new FormControl('',[Validators.pattern("^([0-9]{9,10})$")]),
      phone: new FormControl('', [Validators.pattern("^([0-9]{9,10})$")]),
      email: new FormControl('',[Validators.email]),
      Company: new FormControl('',[Validators.required]),
    });
  }
   
 ngOnInit(){
  this.route.params.subscribe((params)=>{
     if(params.contactID!='-')
         this.contactId=params.contactID;
  });
  if(this.contactId)
   this.Mservice.GetByID('Contact',this.contactId).subscribe(contact=>
     {this.contact=contact; console.log(contact);
      this.contactForm = new FormGroup({
        name: new FormControl(this.contact.name, [Validators.required]),
        officePhone : new FormControl(this.contact.officePhone,[Validators.pattern("^([0-9]{9,10})$")]),
        phone: new FormControl(this.contact.phone, [Validators.pattern("^([0-9]{9,10})$")]),
        email: new FormControl(this.contact.email,[Validators.email]),
        Company: new FormControl(this.contact.CompanyId,[Validators.required]),
      });
    },
    err=>{console.log(err)
    });
    this.Mservice.GetAllList('Company').subscribe(
      companies=> this.companyList=companies,
      err=>console.log(err)
    );
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
       this.Mservice.Edit('Contact',newContact).subscribe(res => {
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
      this.Mservice.Edit('Contact',newContact).subscribe(res => {
        this.snackBar.open("האיש קשר נוסף בהצלחה!", "סגור", {
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
