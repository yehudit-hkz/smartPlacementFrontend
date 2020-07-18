import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HttpClientModule}from '@angular/common/http';
import {MaterialModule}from'./material.module';
import { ChartsModule } from 'ng2-charts';

import { GraduatesComponent } from './graduate/graduates/graduates.component';
import { GraduateDetailsComponent } from './graduate/graduate-details/graduate-details.component';
import { DeletionDialogComponent } from './deletion-dialog/deletion-dialog.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { GraduateFormComponent } from './graduate/graduate-form/graduate-form.component';
import { NewGraduateComponent } from './graduate/new-graduate/new-graduate.component';
import { GraduateEditingComponent } from './graduate/graduate-editing/graduate-editing.component';
import { CompaniesComponent } from './company/companies/companies.component';
import { ShortStrPipe } from './pipes/short-str.pipe';
import { CompanyFormComponent } from './company/company-form/company-form.component';
import { JobsCoordinationComponent } from './job/jobs-coordination/jobs-coordination.component';
import { ContactsComponent } from './contact/contacts/contacts.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { JobsComponent } from './job/jobs/jobs.component';
import { JobFormComponent } from './job/job-form/job-form.component';
import { ChartsComponent } from './charts/charts.component';
import { MatchJobCandidatesComponent } from './graduate/match-job-candidates/match-job-candidates.component';



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
    JobsCoordinationComponent,
    ContactsComponent,
    ContactFormComponent,
    JobsComponent,
    JobFormComponent,
    ChartsComponent,
    MatchJobCandidatesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
  ],
  entryComponents: [
    DeletionDialogComponent,
    MatchJobCandidatesComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


