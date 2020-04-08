import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsCoordinationComponent } from './jobs-coordination.component';

describe('JobsCoordinationComponent', () => {
  let component: JobsCoordinationComponent;
  let fixture: ComponentFixture<JobsCoordinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsCoordinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsCoordinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
