import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Job }from '../../classes/job';
import { Company } from '../../classes/company';
import { MainService } from 'src/app/services/main.service';
import { ListsService } from 'src/app/services/lists.service';
import { EnumListsService } from 'src/app/services/enum-lists.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MatchJobCandidatesComponent } from '../../graduate/match-job-candidates/match-job-candidates.component';
import { JobsCoordinationComponent } from '../../job/jobs-coordination/jobs-coordination.component'

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {
  job= new Job();
  jobForm: FormGroup;

  @ViewChild(JobsCoordinationComponent, { static: false }) childC: JobsCoordinationComponent;

  constructor(private location: Location,
    private snackBar: MatSnackBar,
    private route:ActivatedRoute,
    public dialog: MatDialog,
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
        company : new FormControl(new Company()),
        contact: new FormControl(null,[Validators.required]),
        // getting: new FormControl("",[Validators.required]),
        // handles  : new FormControl("",[Validators.required]),
      });
      Mservice.compenies
     }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      if(params.jobID!='-')
          this.job.Id=params.jobID
  });
  if(this.job.Id)
    this.Mservice.GetByID('Job',this.job.Id).subscribe(job=>
     { this.job=job;
           let tepCopmpany=this.Mservice.compenies.find(cm=>this.job.companyId==cm.Id);
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
        company: new FormControl(tepCopmpany),
          contact: new FormControl(
            tepCopmpany.Contact.find(cn=>this.job.contactId==cn.Id),
            [Validators.required]),
        //later:
        //// getting: new FormControl("",[Validators.required]),
        // handles  : new FormControl("",[Validators.required]),
      });
      },
     err=>{this.Mservice.showServerError()}
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
    newJob.title=jobFormValue.title;
    newJob.Subject=jobFormValue.subject;
    newJob.description=jobFormValue.description;
    newJob.didSendCV=jobFormValue.didSendCV;
    newJob.isActive=!jobFormValue.isActive;
    newJob.ReasonForClosing=jobFormValue.ReasonForClosing;
    newJob.companyId=jobFormValue.company.Id;
    newJob.contactId=jobFormValue.contact.Id;
    newJob.gettingId=1;
    newJob.handlesId=1;
     if(this.job.Id){
       newJob.dateReceived=this.job.dateReceived;
      //edit -function;
      this.Mservice.Edit('Job',newJob).subscribe(res => {
       this.snackBar.open("הפרטים עודכנו בהצלחה!", "סגור", {
         duration: 6000,
         direction:"rtl",
       });  
     },
     error => {
      this.Mservice.showServerError()
     });  }
     else{
     // add new -function;
     this.Mservice.Save('Job',newJob).subscribe(res => {
       console.log(res);
       this.job.Id= res
       this.job.Subject=newJob.Subject;
       this.snackBar.open("המשרה נוספה בהצלחה!", "סגור", {
         duration: 6000,
         direction:"rtl",
       });  
     },
     (error => {
      this.Mservice.showServerError()
     })
   );}
  }
  MatchJobCandidates(){
    const dialogRef = this.dialog.open(MatchJobCandidatesComponent, {
      width: '99%',
        data: {job:this.job.Id,subject:this.job.Subject.Id},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result==true){
        console.log(`Dialog result: ${result}`);
        // send offerd email
        this.childC.ngOnInit();
      }
    });
  }
}

  
  
     
   