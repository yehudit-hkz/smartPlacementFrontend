import { Component, OnInit ,Output, EventEmitter, Input, OnChanges} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Graduate, GraduateLanguages }from '../../classes/graduate';
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
  
  languageForm = new FormGroup({ 
    languageId : new FormControl('', [Validators.required]) ,
    level : new FormControl(false) 
});

  constructor(private location: Location,
    public Mservice:MainService,
    public Eservice:EnumListsService,
    public Lservice:ListsService) {
      this.graduateForm = new FormGroup({
        Id: new FormControl("", [Validators.required,Validators.pattern('^([0-9]{9})$')]),
        gender: new FormControl("", [Validators.required]),
        lastName: new FormControl("", [Validators.required]),
        firstName: new FormControl("", [Validators.required]),
        dateOfBirth: new FormControl("",[Validators.required]),
        address: new FormControl("", []),
        zipCode: new FormControl("", [Validators.pattern('^(([0-9]{5})|([0-9]{7})|([0-9]{9}))$')]),
        city: new FormControl("",[Validators.required]),
        email: new FormControl("", [Validators.required,Validators.email]),
        phone: new FormControl("", [Validators.required,Validators.pattern(/^0(([23489]{1}\d{7})|[57]{1}\d{8})$/)]),
        languages: new FormArray([ ]),
        branch: new FormControl("", [Validators.required]),
        expertise: new FormControl("",[Validators.required]),
        startYear: new FormControl("", [Validators.required,Validators.max((new Date()).getFullYear()),Validators.pattern("^([1-9][0-9]{3})$")]),
        endYear: new FormControl("", [Validators.required,Validators.min((new Date(Number(""),1,1)).getFullYear()),Validators.pattern("^([1-9][0-9]{3})$|(טרם)|(טרם )")]),
        didGraduate: new FormControl("", []),
        hasDiploma: new FormControl("", []),
        isWorkerInProfession: new FormControl("", []),
        companyName: new FormControl("", []),
        role: new FormControl("", []),
        placedByThePlacementDepartment: new FormControl("", []),
        hasExperience: new FormControl("", []),
        isActive: new FormControl("", []),
        uploadfile: new FormControl()
      });
    }
 ngOnInit(){
  console.log("in "+this.graduate);

   this.ngOnChanges();
 }
 
  ngOnChanges() {
    // Languages:GraduateLanguages[];
   // linkToCV:string;
    console.log("ch "+this.graduate);
    if(this.graduate)
    {
      if(this.graduate.Languages == undefined)
        this.graduate.Languages = [];
      this.graduateForm = new FormGroup({
        Id: new FormControl(this.graduate.Id, [Validators.required,Validators.pattern('^([0-9]{9})$')]),
        gender: new FormControl(this.graduate.gender, [Validators.required]),
        lastName: new FormControl(this.graduate.lastName, [Validators.required]),
        firstName: new FormControl(this.graduate.firstName, [Validators.required]),
        dateOfBirth: new FormControl(this.graduate.dateOfBirth,[Validators.required]),
        address: new FormControl(this.graduate.address, []),
        zipCode: new FormControl(this.graduate.zipCode, [Validators.pattern('^(([0-9]{5})|([0-9]{7})|([0-9]{9}))$')]),
        city: new FormControl(
          this.graduate.Id? this.Lservice.cities.find(c=>this.graduate.City.Id==c.Id):"",
          [Validators.required]),
        email: new FormControl(this.graduate.email, [Validators.required,Validators.email]),
        phone: new FormControl(this.graduate.phone, [Validators.required,Validators.pattern(/^0(([23489]{1}\d{7})|[57]{1}\d{8})$/)]),
        languages: new FormArray(
        this.graduate.Languages.map(
            data => new FormGroup({ 
              languageId : new FormControl(
                this.graduate.Id? this.Lservice.languages.find(l=>l.Id == data.languageId):"", 
                [Validators.required]) ,
              level : new FormControl(data.level == 1 ? true : false ) 
            }),
          )),
        branch: new FormControl(
          this.graduate.Id? this.Lservice.branches.find(b=> this.graduate.Branch.Id==b.Id):"",
          [Validators.required]),
        expertise: new FormControl(
          this.graduate.Id? this.Lservice.expertises.find(e=>this.graduate.Expertise.Id==e.Id):"",
          [Validators.required]),
        startYear: new FormControl(this.graduate.startYear, [Validators.required,Validators.max((new Date()).getFullYear()),Validators.pattern("^([1-9][0-9]{3})$")]),
        endYear: new FormControl(this.graduate.endYear, [Validators.required,Validators.min((new Date(Number(this.graduate.startYear),1,1)).getFullYear()),Validators.pattern("^([1-9][0-9]{3})$|(טרם)|(טרם )")]),
        didGraduate: new FormControl(this.graduate.didGraduate, []),
        hasDiploma: new FormControl(this.graduate.hasDiploma, []),
        isWorkerInProfession: new FormControl(this.graduate.isWorkerInProfession, []),
        companyName: new FormControl(this.graduate.companyName, []),
        role: new FormControl(this.graduate.role, []),
        placedByThePlacementDepartment: new FormControl(this.graduate.placedByThePlacementDepartment, []),
        hasExperience: new FormControl(this.graduate.hasExperience, []),
        isActive: new FormControl(this.graduate.isActive, []),
        uploadfile: new FormControl()
        });
    }
    this.onList();
  }

  displayFn(item?: any): string | undefined {
    return item ? item.name : undefined;
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.graduateForm.controls[controlName].hasError(errorName);
  }

  onStartYearChange(value){
    this.graduateForm.controls["endYear"].setValidators([Validators.required,Validators.min((new Date(Number(value),1,1)).getFullYear()),Validators.pattern("^([1-9][0-9]{3})$|(טרם)")])
    this.graduateForm.controls["endYear"].updateValueAndValidity();
    this.graduateForm.controls["endYear"].markAsTouched();
  }

  onList(){
    this.graduateForm.controls["city"].valueChanges.subscribe(city=>{
      city = typeof(city) == "string" ? city : city.name;
      if(city != '')     
      if( this.Lservice.cities.findIndex(c=> c.name == city )==-1 ){
        this.graduateForm.controls["city"].setErrors({invalidCity:true})  
      }
      else{
        this.graduateForm.controls["city"].setErrors(null)
      }
    })
    this.graduateForm.controls["expertise"].valueChanges.subscribe(expertise=>{
      expertise = typeof(expertise) == "string" ? expertise : expertise.name;
      if(expertise != '')
        if(this.Lservice.expertises.findIndex(e=> e.name == expertise )==-1 ){
          this.graduateForm.controls["expertise"].setErrors({invalidExpertise:true})}
        else{
          this.graduateForm.controls["expertise"].setErrors(null)}
    })
    this.languageForm.controls["languageId"].valueChanges.subscribe(language=>{
      language = typeof(language) == "string" ? language : language.name;
      if(language != '')
        if(this.Lservice.languages.findIndex(l=> l.name == language )==-1 ){
          this.languageForm.controls["languageId"].setErrors({invalidLanguage:true})}
        else{
          this.languageForm.controls["languageId"].setErrors(null)}
    })
    this.graduateForm.get('languages').valueChanges.subscribe(()=>{ 
      const languages = (<FormArray>this.graduateForm.get('languages')).controls as Array<FormGroup>
        languages.forEach(gl=>
          gl.controls["languageId"].valueChanges.subscribe(language=>{
            language = typeof(language) == "string" ? language : language.name;
            if(language != '')
              if(this.Lservice.languages.findIndex(l=> l.name == language )==-1 ){
                gl.controls["languageId"].setErrors({invalidLanguage:true})}
              else{
                gl.controls["languageId"].setErrors(null)}
          })
        )
      });
  }
  public addLanguage() {
    const languages = this.graduateForm.get('languages') as FormArray
    languages.push( 
      new FormGroup({ 
        languageId : new FormControl(this.languageForm.value.languageId, [Validators.required]) ,
        level : new FormControl(this.languageForm.value.level) 
    }));  
    this.languageForm.reset();
    languages.markAsDirty();
  }

  public removeLanguage(i: number) {
    const languages = this.graduateForm.get('languages') as FormArray
      languages.removeAt(i)
      languages.markAsDirty();
  }
 
  public onCancel = () => {
    this.location.back();
  }
 
  public createGraduate = (ownerFormValue) => {
    if (this.graduateForm.valid) {
      this.executeGraduateCreation(ownerFormValue,this.graduateForm.controls['languages'].dirty);
    }
  }
 
  private executeGraduateCreation = (graduateFormValue,GLDirty) => {
    let newGraduate=new Graduate();
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
        // if(GLDirty){
          newGraduate.Languages = graduateFormValue.languages.map(
            l=> <GraduateLanguages>{
              graduateId: newGraduate.Id,
              languageId: l.languageId.Id,
              languageName : '',
              level: l.level? 1 : 2
          });
        // }
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
          console.log(graduateFormValue.uploadfile._files[0].mozFullPath)
          this.executeUploadFile(graduateFormValue.uploadfile._files[0],newGraduate.Id);
          newGraduate.linkToCV=`${newGraduate.Id}.pdf`

        }
    this.submitGraduate.emit(newGraduate);
  }

executeUploadFile(fileToUpload: File ,name:string){
    let formData = new FormData();
    name += fileToUpload.name.substr(fileToUpload.name.lastIndexOf('.'));;
    formData.append("file", fileToUpload, name);
    this.Mservice.UploadCVFile(formData).subscribe(res => { })
    console.log(fileToUpload);
}
}

