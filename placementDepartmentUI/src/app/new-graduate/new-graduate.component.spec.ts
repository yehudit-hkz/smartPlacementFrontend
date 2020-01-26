import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGraduateComponent } from './new-graduate.component';

describe('NewGraduateComponent', () => {
  let component: NewGraduateComponent;
  let fixture: ComponentFixture<NewGraduateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGraduateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGraduateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
