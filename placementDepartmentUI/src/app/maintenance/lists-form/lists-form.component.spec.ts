import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsFormComponent } from './lists-form.component';

describe('ListsFormComponent', () => {
  let component: ListsFormComponent;
  let fixture: ComponentFixture<ListsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
