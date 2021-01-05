import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS}from '@angular/common/http';
import { MaterialModule }from'./material.module';
import { ChartsModule } from 'ng2-charts';

import { MAT_DATE_LOCALE, } from 'saturn-datepicker';

import { GraduatesComponent } from './graduate/graduates/graduates.component';
import { GraduateDetailsComponent } from './graduate/graduate-details/graduate-details.component';
import { DeletionDialogComponent } from './messages/deletion-dialog/deletion-dialog.component';
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
import { ImportFromExcelComponent } from './graduate/import-from-excel/import-from-excel.component';
import { FilterPipe } from './pipes/filter.pipe';
import { LoginComponent } from './user/login/login.component';
import { UsersComponent } from './user/users/users.component';
import { ListsFormComponent } from './maintenance/lists-form/lists-form.component';
import { ListsComponent } from './maintenance/lists/lists.component';
import { ExprtWithSubjComponent } from './maintenance/exprt-with-subj/exprt-with-subj.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { PlacementsComponent } from './placements/placements.component';
import { Error403Component } from './messages/error403/error403.component';
import { IOerrorComponent } from './messages/ioerror/ioerror.component';
import { TokenInterceptor } from './services/token.interceptor';
import { JwtInterceptor } from './services/jwt.interceptor';


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
    ImportFromExcelComponent,
    FilterPipe,
    LoginComponent,
    UsersComponent,
    ListsFormComponent,
    ListsComponent,
    ExprtWithSubjComponent,
    ChangePasswordComponent,
    HomeComponent,
    UserFormComponent,
    PlacementsComponent,
    Error403Component,
    IOerrorComponent,
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
    ChangePasswordComponent,
    MatchJobCandidatesComponent,
    IOerrorComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    { 
      provide: MAT_DATE_LOCALE,
      useValue: 'he-IL' 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


