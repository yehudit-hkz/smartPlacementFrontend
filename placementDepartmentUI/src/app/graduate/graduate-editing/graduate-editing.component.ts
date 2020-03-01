import { Component, OnInit } from '@angular/core';
import { Graduate } from '../../classes/graduate';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../services/main.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-graduate-editing',
  templateUrl: './graduate-editing.component.html',
  styleUrls: ['./graduate-editing.component.scss']
})
export class GraduateEditingComponent implements OnInit {
  id:string;
  graduate:Graduate;


  constructor(
    private route:ActivatedRoute,
    public service :MainService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>
    this.id=params.graduateID);
    this.service.GetByID('Graduate',this.id).subscribe(graduate=>
      {this.graduate=graduate;},
     err=>{console.log(err);}
    );
  }

  editDetailsGraduate(editingGraduate:Graduate){
  this.service.Edit('Graduate',editingGraduate).subscribe(res => {
    this.snackBar.open("הפרטים עודכנו בהצלחה!", "סגור", {
      duration: 6000,
      direction:"rtl",
    });  
  },
  error => {
    //temporary as well
  }); 
    console.log(editingGraduate)
  }
}
