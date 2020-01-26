import { Component, OnInit } from '@angular/core';
import { Graduate } from '../classes/graduate';

@Component({
  selector: 'app-new-graduate',
  templateUrl: './new-graduate.component.html',
  styleUrls: ['./new-graduate.component.scss']
})
export class NewGraduateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  addNewGraduate(newGraduate:Graduate){
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
    console.log(newGraduate);
  }
}
