import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HttpClientModule}from '@angular/common/http';
import{MaterialModule}from'./material.module';

import { GraduatesComponent } from './graduate/graduates/graduates.component';
import { GraduateDetailsComponent } from './graduate/graduate-details/graduate-details.component';
import {StamService}from './services/stam.service';
import { from } from 'rxjs';
import { DeletionDialogComponent } from './deletion-dialog/deletion-dialog.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { GraduateFormComponent } from './graduate/graduate-form/graduate-form.component';
import { NewGraduateComponent } from './graduate/new-graduate/new-graduate.component';
import { GraduateEditingComponent } from './graduate/graduate-editing/graduate-editing.component';
import { CompaniesComponent } from './company/companies/companies.component';
import { ShortStrPipe } from './pipes/short-str.pipe';
import { CompanyFormComponent } from './company/company-form/company-form.component';


 

@NgModule({
  declarations: [
    AppComponent,
    GraduatesComponent,
    GraduateDetailsComponent,
    DeletionDialogComponent,
    GraduateFormComponent,
    NewGraduateComponent,
    GraduateEditingComponent,
    CompaniesComponent,
    ShortStrPipe,
    CompanyFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  entryComponents: [
    DeletionDialogComponent
  ],
  providers: [StamService],
  bootstrap: [AppComponent]
})
export class AppModule { }


