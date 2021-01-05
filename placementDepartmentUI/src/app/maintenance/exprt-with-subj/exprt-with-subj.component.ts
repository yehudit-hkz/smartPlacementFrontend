import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ListsService } from 'src/app/services/lists.service';

@Component({
  selector: 'app-exprt-with-subj',
  templateUrl: './exprt-with-subj.component.html',
  styleUrls: ['./exprt-with-subj.component.scss']
})
export class ExprtWithSubjComponent implements OnInit {

  listForm:FormGroup;
  controller='ExprtWithSubj'

  dataForm= new FormGroup({ 
    expertise : new FormControl( '' ,[Validators.required]) ,
    subject : new FormControl( '' , [Validators.required]) ,
  });

  constructor( public Lservice:ListsService,
    private snackBar: MatSnackBar) {
    this.listForm = new FormGroup ({
      array: new FormArray([])
    });
    this.onList();
   }

  ngOnInit() {
    this.Lservice.GetAllList(this.controller).subscribe(list=>{
      this.listForm =new FormGroup ({
        array: new FormArray(
          list.map(
              data => new FormGroup({ 
                idexpertise : new FormControl( data.expertise.Id ) ,
                expertise : new FormControl( data.expertise.name ) ,
                idsubject : new FormControl( data.subject.Id ) ,
                subject : new FormControl( data.subject.name ) ,
              }),
            ))
          });
        });
  }

  displayFn(item?: any): string | undefined {
    return item ? item.name : undefined;
  }

  onList(){
    this.dataForm.controls["subject"].valueChanges.subscribe(subject=>{
      subject = typeof(subject) == "string" ? subject : subject.name;
      if(subject != '')
      if( this.Lservice.subjects.findIndex(s=> s.name == subject ) == -1 ){
        this.dataForm.controls["subject"].setErrors({invalidSubject:true})  
      }
      else{
        this.dataForm.controls["subject"].setErrors(null)
      }
    });
    this.dataForm.controls["expertise"].valueChanges.subscribe(expertise=>{
      expertise = typeof(expertise) == "string" ? expertise : expertise.name;
      if(expertise != '')
        if(this.Lservice.expertises.findIndex(e=> e.name == expertise )==-1 ){
          this.dataForm.controls["expertise"].setErrors({invalidExpertise:true})}
        else{
          this.dataForm.controls["expertise"].setErrors(null)}
    });
  }

  add(){
  let obj = {
            expertise:{Id:this.dataForm.value.expertise.Id,name:this.dataForm.value.expertise.name},
            subject:  {Id:this.dataForm.value.subject.Id,  name:this.dataForm.value.subject.name  }
            };
  this.Lservice.Save(this.controller,obj).subscribe(id=>{
  const array = this.listForm.get('array') as FormArray
    array.push( 
      new FormGroup({ 
        idexpertise : new FormControl( this.dataForm.value.expertise.Id ) ,
        expertise : new FormControl( this.dataForm.value.expertise.name ) ,
        idsubject : new FormControl( this.dataForm.value.subject.Id ) ,
        subject : new FormControl( this.dataForm.value.subject.name ) ,
    }));  
  },
  err=>  {
    if(err.error.ExceptionType == "System.Exception" 
    && err.error.ExceptionMessage == "Duplicate")
    this.snackBar.open('כבר קיימת התאמה זהה', "סגור", {
      duration: 8000,
      direction:"rtl",
      verticalPosition:'top',
      panelClass:"err-msg"
    });
  }
);
this.dataForm.reset();
}
remove(i: number) {
  const array = this.listForm.get('array') as FormArray
  this.Lservice.DeleteSubjInExprt(array.value[i].idexpertise,array.value[i].idsubject).subscribe(data=>
    array.removeAt(i)
    );
}
}