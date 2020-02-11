import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduatesComponent } from './graduates.component';

describe('GraduatesComponent', () => {
  let component: GraduatesComponent;
  let fixture: ComponentFixture<GraduatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraduatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
