import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchJobCandidatesComponent } from './match-job-candidates.component';

describe('MatchJobCandidatesComponent', () => {
  let component: MatchJobCandidatesComponent;
  let fixture: ComponentFixture<MatchJobCandidatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchJobCandidatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchJobCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
