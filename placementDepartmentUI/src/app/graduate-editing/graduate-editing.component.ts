import { Component, OnInit } from '@angular/core';
import { Graduate } from '../classes/graduate';
import { ActivatedRoute } from '@angular/router';
import { StamService } from '../services/stam.service';
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
    public GTS :StamService) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>
    this.id=params.graduateID);
    this.GTS.getGraduateByID(this.id).subscribe(graduate=>
      {this.graduate=graduate;},
     err=>{console.log(err);}
    );
  }

  editDetailsGraduate(newGraduate:Graduate){
    // let apiUrl = 'api/owner';
    // this.repository.create(apiUrl, owner)
    //   .subscribe(res => {
    //     //this is temporary, until we create our dialogs
    //     this.location.back();
    //   },
    //   (error => {
    //     //temporary as well
    //     this.location.back();
    //   })
    //)
    console.log(newGraduate)
  }
}
