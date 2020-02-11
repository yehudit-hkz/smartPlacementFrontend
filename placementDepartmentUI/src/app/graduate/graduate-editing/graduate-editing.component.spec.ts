import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduateEditingComponent } from './graduate-editing.component';

describe('GraduateEditingComponent', () => {
  let component: GraduateEditingComponent;
  let fixture: ComponentFixture<GraduateEditingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraduateEditingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraduateEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
