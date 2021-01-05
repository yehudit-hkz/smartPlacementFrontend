import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-error403',
  templateUrl: './error403.component.html',
  styleUrls: ['./error403.component.scss']
})
export class Error403Component implements AfterViewInit, OnDestroy {
    constructor(private elementRef: ElementRef){

    }
    ngAfterViewInit(){
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fddb5f';
   }
   ngOnDestroy() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fff';
  }
   
}
