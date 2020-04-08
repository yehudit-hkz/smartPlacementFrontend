import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Job }from '../../classes/job';
import { MainService } from 'src/app/services/main.service';
import { ListsService } from 'src/app/services/lists.service';
import { EnumListsService } from 'src/app/services/enum-lists.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {
  job= new Job();
  jobForm: FormGroup;

  constructor(private location: Location,
    private snackBar: MatSnackBar,
    private route:ActivatedRoute,
    public Mservice :MainService,
    public Lservice :ListsService,
    public Eservice :EnumListsService) 
    {
      this.jobForm = new FormGroup({
        title: new FormControl("", [Validators.required,Validators.maxLength(50)]),
        subject: new FormControl("",[Validators.required]),
        description: new FormControl(""),
        //// dateReceived: new FormControl("",[Validators.required]),
        //// lastUpdateDate: new FormControl("",[Validators.required]),
        didSendCV: new FormControl(""),
        isActive: new FormControl(""),
        ReasonForClosing: new FormControl(""),
        // companyName: new FormControl(""),
        //contact: new FormControl("",[Validators.required]),
        // getting: new FormControl("",[Validators.required]),
        // handles  : new FormControl("",[Validators.required]),
      });
     }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      if(params.jobID!='-')
          this.job.Id=params.jobID
  });
  if(this.job.Id)
    this.Mservice.GetByID('Job',this.job.Id).subscribe(job=>
     { this.job=job;
      this.jobForm = new FormGroup({
        title: new FormControl( this.job.title,[Validators.required,Validators.maxLength(50)]),
        subject: new FormControl(
         this.Lservice.subjects.find(s=>this.job.Subject.Id==s.Id)
         ,[Validators.required]),
        description: new FormControl(this.job.description),
        ////view??
        //// dateReceived: new FormControl("",[Validators.required]),
        //// lastUpdateDate: new FormControl("",[Validators.required]),
        didSendCV: new FormControl(this.job.didSendCV),
        isActive: new FormControl(!this.job.isActive),
        ReasonForClosing: new FormControl(
          this.job.ReasonForClosing?this.Eservice.reasonsForClosing.find(r=>this.job.ReasonForClosing.Id==r.Id):''),
        //later:
        // companyName: new FormControl(""),
        // contact: new FormControl("",[Validators.required]),
        //// getting: new FormControl("",[Validators.required]),
        // handles  : new FormControl("",[Validators.required]),
      });
      },
     err=>{console.log(err);}
    );
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.jobForm.controls[controlName].hasError(errorName);
  }
 
  public onCancel = () => {
    this.location.back();
  }
 
  public createJob = (ownerFormValue) => {
    if (this.jobForm.valid) {
      this.executeJobCreation(ownerFormValue);
    }
  }

  private executeJobCreation = (jobFormValue) => {
    let newJob=new Job();
    if(this.job)
        newJob.Id=this.job.Id;
    newJob.title=jobFormValue.name;
    newJob.Subject=jobFormValue.subject;
    newJob.description=jobFormValue.description;
    newJob.didSendCV=jobFormValue.didSendCV;
    newJob.isActive=!jobFormValue.isActive;
    newJob.ReasonForClosing=jobFormValue.ReasonForClosing;
     if(this.job.Id)
      //edit -function;
      this.Mservice.Edit('Job',this.job).subscribe(res => {
       this.snackBar.open("הפרטים עודכנו בהצלחה!", "סגור", {
         duration: 6000,
         direction:"rtl",
       });  
     },
     error => {
       //temporary as well
     }); 
     else
     // add new -function;
     this.Mservice.Edit('Job',newJob).subscribe(res => {
       this.snackBar.open("המשרה נוספה בהצלחה!", "סגור", {
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

  
  
     
   