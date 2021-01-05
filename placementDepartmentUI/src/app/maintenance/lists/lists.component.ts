import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  controllers=[
    {name:'הכשרות',icon:'local_library',desc:"תחומי לימוד במרכז החרדי",link:'list/Expertise'},
    {name:'מקצועות',icon:'work',desc:'תחומי עבודה בפועל',link:'list/Subject'},
    {name:'התאמות',icon:'ballot',desc:'הקבלת הכשרות מול מקצועות',link:'EwithS'},
    {name:'שלוחות',icon:'location_city',desc:"מרכזי לימוד המרכז החרדי",link:'list/Branch'},
    {name:'ערים',icon:'location_on',desc:'מיקום חברות ובוגרים',link:'list/City'},
    {name:'שפות',icon:'language',desc:'שפות עבור בוגרים',link:'list/Language'},
  ]

  constructor() { }

  ngOnInit() {
  }

}
