import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraduatesComponent } from './graduate/graduates/graduates.component';
import { GraduateDetailsComponent } from './graduate/graduate-details/graduate-details.component';
import { NewGraduateComponent } from './graduate/new-graduate/new-graduate.component';
import { GraduateEditingComponent } from './graduate/graduate-editing/graduate-editing.component';
import{ CompaniesComponent } from './company/companies/companies.component';
import{ CompanyFormComponent } from './company/company-form/company-form.component';
import{ ContactsComponent } from './contact/contacts/contacts.component';
import{ ContactFormComponent } from './contact/contact-form/contact-form.component';
import{ JobsComponent } from './job/jobs/jobs.component'
import{ JobFormComponent } from './job/job-form/job-form.component';
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [
    {path: 'graduates', component: GraduatesComponent },
    {path:'graduate-details/:graduateID' ,component:GraduateDetailsComponent},
    {path:'new-graduate' ,component:NewGraduateComponent},
    {path:'graduate-editing/:graduateID' ,component:GraduateEditingComponent},
    {path:'companies' ,component:CompaniesComponent},
    {path:'company-form/:companyID',component:CompanyFormComponent},
    {path:'contacts/:companyID',component:ContactsComponent},
    {path:'contact-form/:contactID',component:ContactFormComponent},
    {path:'jobs',component:JobsComponent},
    {path:'job-form/:jobID',component:JobFormComponent},
    {path:'Charts',component:ChartsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
