import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IOerrorComponent } from './ioerror.component';

describe('IOerrorComponent', () => {
  let component: IOerrorComponent;
  let fixture: ComponentFixture<IOerrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IOerrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IOerrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
