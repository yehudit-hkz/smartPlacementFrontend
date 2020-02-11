import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateDetailsComponent } from './graduate-details.component';

describe('GraduateDetailsComponent', () => {
  let component: GraduateDetailsComponent;
  let fixture: ComponentFixture<GraduateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraduateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
