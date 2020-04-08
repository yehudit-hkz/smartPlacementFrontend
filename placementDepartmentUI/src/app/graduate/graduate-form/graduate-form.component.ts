import { Component, OnInit ,Output, EventEmitter, Input, OnChanges} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Graduate }from '../../classes/graduate';
import { City, Branch, Expertise } from '../../classes/my-enum-list';
import { MainService } from '../../services/main.service';
import { EnumListsService } from '../../services/enum-lists.service';
import { ListsService } from '../../services/lists.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-graduate-form',
  templateUrl: './graduate-form.component.html',
  styleUrls: ['./graduate-form.component.scss']
})
export class GraduateFormComponent implements OnChanges,OnInit {
 @Input('graduateForEdit') graduate= new Graduate();
 @Output() submitGraduate= new EventEmitter<Graduate>();

  graduateForm: FormGroup;
  maxDate = new Date(new Date().getFullYear()-16, 11, 31);
  minDate = new Date(new Date().getFullYear() - 80, 0, 1);
  

  constructor(private location: Location,
    public Mservice:MainService,
    public Eservice:EnumListsService,
    public Lservice:ListsService) {
      // this.graduateForm = new FormGroup({
      //   Id: new FormControl("", [Validators.required,Validators.pattern('^([0-9]{9})$')]),
      //   gender: new FormControl("", [Validators.required]),
      //   lastName: new FormControl("", [Validators.required,Validators.maxLength(50)]),
      //   firstName: new FormControl("", [Validators.required,Validators.maxLength(50)]),
      //   dateOfBirth: new FormControl("",[Validators.required]),
      //   address: new FormControl("", []),
      //   zipCode: new FormControl("", [Validators.pattern('^([0-9]{10})$')]),
      //   city: new FormControl("",[Validators.required]),
      //   email: new FormControl("", [Validators.required,Validators.email,Validators.maxLength(50)]),
      //   phone: new FormControl("", [Validators.required,Validators.pattern("^([0-9]{9,10})$")]),
      //   branch: new FormControl("", [Validators.required]),
      //   expertise: new FormControl("",[Validators.required]),
      //   startYear: new FormControl("", [Validators.required,Validators.maxLength(4)]),
      //   endYear: new FormControl("", [Validators.required,Validators.maxLength(4)]),
      //   didGraduate: new FormControl("", []),
      //   hasDiploma: new FormControl("", []),
      //   isWorkerInProfession: new FormControl("", []),
      //   companyName: new FormControl("", [Validators.maxLength(50)]),
      //   role: new FormControl("", [Validators.maxLength(50)]),
      //   placedByThePlacementDepartment: new FormControl("", []),
      //   hasExperience: new FormControl("", []),
      //   isActive: new FormControl("", []),
      //   uploadfile: new FormControl()
      // });
    }
 ngOnInit(){
  console.log("in "+this.graduate);
   this.ngOnChanges();
 }
 
  ngOnChanges() {
    // Languages:GraduateLanguages[];
   // linkToCV:string;
    console.log("ch "+this.graduate);
    this.graduateForm = new FormGroup({
      Id: new FormControl(this.graduate.Id, [Validators.required,Validators.pattern('^([0-9]{9})$')]),
      gender: new FormControl(this.graduate.gender, [Validators.required]),
      lastName: new FormControl(this.graduate.lastName, [Validators.required,Validators.maxLength(50)]),
      firstName: new FormControl(this.graduate.firstName, [Validators.required,Validators.maxLength(50)]),
      dateOfBirth: new FormControl(this.graduate.dateOfBirth,[Validators.required]),
      address: new FormControl(this.graduate.address, []),
      zipCode: new FormControl(this.graduate.zipCode, [Validators.pattern('^([0-9]{10})$')]),
      city: new FormControl(
        this.graduate.Id? this.Eservice.cities.find(c=>this.graduate.City.Id==c.Id):"",
         [Validators.required]),
      email: new FormControl(this.graduate.email, [Validators.required,Validators.email,Validators.maxLength(50)]),
      phone: new FormControl(this.graduate.phone, [Validators.required,Validators.pattern("^([0-9]{9,10})$")]),
      branch: new FormControl(
        this.graduate.Id? this.Lservice.branches.find(b=> this.graduate.Branch.Id==b.Id):"",
         [Validators.required]),
      expertise: new FormControl(
       this.graduate.Id? this.Lservice.expertise.find(e=>this.graduate.Expertise.Id==e.Id):"",
         [Validators.required]),
      startYear: new FormControl(this.graduate.startYear, [Validators.required,Validators.maxLength(4)]),
      endYear: new FormControl(this.graduate.endYear, [Validators.required,Validators.maxLength(4)]),
      didGraduate: new FormControl(this.graduate.didGraduate, []),
      hasDiploma: new FormControl(this.graduate.hasDiploma, []),
      isWorkerInProfession: new FormControl(this.graduate.isWorkerInProfession, []),
      companyName: new FormControl(this.graduate.companyName, [Validators.maxLength(50)]),
      role: new FormControl(this.graduate.role, [Validators.maxLength(50)]),
      placedByThePlacementDepartment: new FormControl(this.graduate.placedByThePlacementDepartment, []),
      hasExperience: new FormControl(this.graduate.hasExperience, []),
      isActive: new FormControl(this.graduate.isActive, []),
      uploadfile: new FormControl()
    });
  }
 
  public hasError = (controlName: string, errorName: string) =>{
    return this.graduateForm.controls[controlName].hasError(errorName);
  }
 
  public onCancel = () => {
    this.location.back();
  }
 
  public createGraduate = (ownerFormValue) => {
    if (this.graduateForm.valid) {
      this.executeGraduateCreation(ownerFormValue);
    }
  }
 
  private executeGraduateCreation = (graduateFormValue) => {
    let newGraduate=new Graduate();
    // Languages:GraduateLanguages[];
        newGraduate.Id=graduateFormValue.Id;
        newGraduate.gender=graduateFormValue.gender;
        newGraduate.lastName=graduateFormValue.lastName;
        newGraduate.firstName=graduateFormValue.firstName;
        if( typeof(graduateFormValue.dateOfBirth)=="string" )  {
          newGraduate.dateOfBirth = graduateFormValue.dateOfBirth;
        }
        else{
          var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
          newGraduate.dateOfBirth = (new Date(graduateFormValue.dateOfBirth - tzoffset));
        }
        newGraduate.address=graduateFormValue.address;
        newGraduate.City=graduateFormValue.city;
        newGraduate.zipCode=graduateFormValue.zipCode;
        newGraduate.phone=graduateFormValue.phone;
        newGraduate.email=graduateFormValue.email;
        newGraduate.Branch=graduateFormValue.branch;
        newGraduate.Expertise=graduateFormValue.expertise;
        newGraduate.startYear=graduateFormValue.startYear;
        newGraduate.endYear=graduateFormValue.endYear;
        newGraduate.dateOfRegistration=this.graduate.dateOfRegistration;
        newGraduate.didGraduate=graduateFormValue.didGraduate;
        newGraduate.hasDiploma=graduateFormValue.hasDiploma;
        newGraduate.isWorkerInProfession=graduateFormValue.isWorkerInProfession;
        newGraduate.companyName=graduateFormValue.companyName;
        newGraduate.role=graduateFormValue.role;
        newGraduate.placedByThePlacementDepartment=graduateFormValue.placedByThePlacementDepartment;
        newGraduate.hasExperience=graduateFormValue.hasExperience;
        newGraduate.isActive=graduateFormValue.isActive;
        newGraduate.linkToCV=this.graduate.linkToCV;
        if(graduateFormValue.uploadfile!=null)
        {
          this.executeUploadFile(graduateFormValue.uploadfile._files[0],newGraduate.Id);
          newGraduate.linkToCV=`ResumeFile/${newGraduate.Id}.pdf`

        }
    this.submitGraduate.emit(newGraduate);
     this.location.back();
  }

executeUploadFile(fileToUpload: File ,name:string){
    let _formData = new FormData();
    name += fileToUpload.name.substr(fileToUpload.name.lastIndexOf('.'));;
    _formData.append("file", fileToUpload, name);
    this.Mservice.UploadCVFile(_formData).subscribe(res => { })
    console.log(fileToUpload);
}
}