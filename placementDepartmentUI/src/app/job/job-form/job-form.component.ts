import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Job }from '../../classes/job';
import { MainService } from 'src/app/services/main.service';
import { ListsService } from 'src/app/services/lists.service';
import { EnumListsService } from 'src/app/services/enum-lists.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MatchJobCandidatesComponent } from '../../graduate/match-job-candidates/match-job-candidates.component';
import { JobsCoordinationComponent } from '../../job/jobs-coordination/jobs-coordination.component'
import { CompanyService } from 'src/app/services/company.service';
import { AuthService } from 'src/app/services/auth.service';

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
    public CCservice :CompanyService,
    public Lservice :ListsService,
    public Eservice :EnumListsService,
    private authService: AuthService) 
    {
      this.jobForm = new FormGroup({
        title: new FormControl("", [Validators.required]),
        subject: new FormControl("",[Validators.required]),
        description: new FormControl(""),
        didSendCV: new FormControl(""),
        isActive: new FormControl(""),
        ReasonForClosing: new FormControl(""),
        company : new FormControl("",[Validators.required]),
        contact: new FormControl(null,[Validators.required]),
        getting  : new FormControl(this.authService.user.name),
        handles  : new FormControl(
          this.Lservice.users?this.Lservice.users.find(u=>this.authService.user.Id==u.Id):""
          ,[Validators.required]),
      });
      this.job.gettingId = this.authService.user.Id;
     }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      if(params.jobID!='-')
          this.job.Id=params.jobID
  });
  if(this.job.Id)
    this.Mservice.GetByID('Job',this.job.Id).subscribe(job=>
     { 
      this.job=job;
      this.CCservice.companiesObs.subscribe(res=>{
        let tepCopmpany=res.find(cm=>this.job.companyId==cm.Id);
      this.jobForm = new FormGroup({
        title: new FormControl( this.job.title,[Validators.required]),
        subject: new FormControl(
         this.Lservice.subjects.find(s=>this.job.Subject.Id==s.Id)
         ,[Validators.required]),
        description: new FormControl(this.job.description),
        didSendCV: new FormControl(this.job.didSendCV),
        isActive: new FormControl(!this.job.isActive),
        ReasonForClosing: new FormControl(
          this.job.ReasonForClosing?this.Eservice.reasonsForClosing.find(r=>this.job.ReasonForClosing.Id==r.Id):''),
        company: new FormControl(tepCopmpany,[Validators.required]),
        contact: new FormControl(
          tepCopmpany.Contact.find(cn=>this.job.contactId==cn.Id),
          [Validators.required]),
        getting  : new FormControl(this.job.gettingName),
        handles  : new FormControl(
          this.Lservice.users?this.Lservice.users.find(u=>this.job.handlesId==u.Id):""
          ,[Validators.required]),
        });
      });
      });
    this.onList()
  }

  displayFn(item?: any): string | undefined {
    return item ? item.name : undefined;
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.jobForm.controls[controlName].hasError(errorName);
  }
  onList(){
    this.jobForm.controls["subject"].valueChanges.subscribe(subject=>{
      subject = typeof(subject) == "string" ? subject : subject.name;
      if(subject != '')
      if( this.Lservice.subjects.findIndex(s=> s.name == subject ) == -1 ){
        this.jobForm.controls["subject"].setErrors({invalidSubject:true})  
      }
      else{
        this.jobForm.controls["subject"].setErrors(null)
      }
    })
    this.jobForm.controls["company"].valueChanges.subscribe(company=>{
      company = typeof(company) == "string" ? company : company.name;
      if(company != '')
      if(this.CCservice.companies.findIndex(c=> c.name == company ) == -1 ){
        this.jobForm.controls["company"].setErrors({invalidCompany:true})  
      }
      else{
        this.jobForm.controls["company"].setErrors(null)
      }
    })
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
    newJob.gettingId=this.job.gettingId;
    newJob.handlesId=jobFormValue.handles.Id;
     if(this.job.Id){
       newJob.dateReceived=this.job.dateReceived;
      //edit -function;
      this.Mservice.Edit('Job',newJob).subscribe(res => {
       this.job=newJob;
         this.snackBar.open("הפרטים עודכנו בהצלחה!", "סגור", {
         duration: 6000,
         direction:"rtl",
       });  
     });  
    }
     else{
     // add new -function;
     this.Mservice.Save('Job',newJob).subscribe(res => {
       console.log(res);
       this.job.Id= res
       this.job=newJob;
       this.snackBar.open("המשרה נוספה בהצלחה!", "סגור", {
         duration: 6000,
         direction:"rtl",
       });  
     });
    }
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
        this.childC.ngOnInit();
      }
    });
  }
  onPlaced(){
    this.ngOnInit();
  }
}

  
  
     
   