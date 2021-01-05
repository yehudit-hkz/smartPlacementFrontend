import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from 'src/app/services/lists.service';

@Component({
  selector: 'app-lists-form',
  templateUrl: './lists-form.component.html',
  styleUrls: ['./lists-form.component.scss']
})
export class ListsFormComponent implements OnInit {

  listForm:FormGroup;
  controller:string;
  title:string;

  dataForm= new FormGroup({ 
    id : new FormControl( '' ) ,
    name : new FormControl( '' , [Validators.required]) ,
    area : new FormControl( '' , ) 
  });
    
    constructor(private route:ActivatedRoute,
                public Lservice:ListsService) { 
      this.listForm = new FormGroup ({
        array: new FormArray([])
      });
    }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
    this.controller=params.controller;
    this.setTitle();
    this.Lservice.getObsByController(this.controller).subscribe(list=>{
    this.listForm =new FormGroup ({
      array: new FormArray(
        list.map(
            data => new FormGroup({ 
              id : new FormControl( data.Id , [Validators.required]) ,
              name : new FormControl( data.name , [Validators.required]) ,
              area : new FormControl(data.area ) 
            }),
          ))
        });
      });
    });
    this.controller=='City'?this.setAreaRequired():'';
  }
  setTitle(){
    switch (this.controller) {
      case 'Branch':
        this.title = "שלוחות";break;
      case 'Expertise':
        this.title = "הכשרות";break;
      case 'Subject':
        this.title = "מקצועות";break;
      case 'Language':
        this.title = "שפות";break;
      case 'City':
        this.title = "ערים";break;
    }
  }
  setAreaRequired(){
    this.dataForm.controls["area"].setValidators([Validators.required])
    const array = this.listForm.get('array') as FormArray
    array.controls.forEach(element => {
      const frm = element as FormGroup
      frm.controls["area"].setValidators([Validators.required])
    });
    
  }
  add(){
    let obj = this.controller!='City'?{name:this.dataForm.value.name}:
      {name:this.dataForm.value.name,area:this.dataForm.value.area};
    if(!this.Lservice.nameExist(this.controller,this.dataForm.value.name))
    {
      this.Lservice.Save(this.controller,obj).subscribe(id=>{
        const array = this.listForm.get('array') as FormArray
        array.push( 
          new FormGroup({ 
            id : new FormControl( id , [Validators.required]) ,
            name : new FormControl( this.dataForm.value.name , [Validators.required]),
            area : new FormControl( this.dataForm.value.area , [Validators.required]) 
        }));  
        this.dataForm.reset();
      });
    }
    else{
      this.dataForm.controls["name"].setErrors({Duplicate:true})
    }
    
  }
  remove(i: number) {
    const array = this.listForm.get('array') as FormArray
    this.Lservice.Delete(this.controller,array.value[i].id).subscribe(data=>
      array.removeAt(i)
      );
  }
  save(fg:FormGroup){
    let obj = this.controller!='City'?{Id:fg.value.id,name:fg.value.name}:
      {Id:fg.value.id,name:fg.value.name,area:fg.value.area};
    if(!this.Lservice.nameExist(this.controller,fg.value.name))
    {
      this.Lservice.edit(this.controller,obj).subscribe();
      fg.markAsPristine();
    }
    else{
      fg.controls["name"].setErrors({Duplicate:true});
    }
  }

}
