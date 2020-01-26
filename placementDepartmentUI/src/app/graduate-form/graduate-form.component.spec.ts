import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateFormComponent } from './graduate-form.component';

describe('GraduateFormComponent', () => {
  let component: GraduateFormComponent;
  let fixture: ComponentFixture<GraduateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraduateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
