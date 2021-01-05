import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportFromExcelComponent } from './import-from-excel.component';

describe('ImportFromExcelComponent', () => {
  let component: ImportFromExcelComponent;
  let fixture: ComponentFixture<ImportFromExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportFromExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportFromExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
