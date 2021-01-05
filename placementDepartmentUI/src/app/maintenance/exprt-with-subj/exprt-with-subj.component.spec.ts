import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExprtWithSubjComponent } from './exprt-with-subj.component';

describe('ExprtWithSubjComponent', () => {
  let component: ExprtWithSubjComponent;
  let fixture: ComponentFixture<ExprtWithSubjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExprtWithSubjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExprtWithSubjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
