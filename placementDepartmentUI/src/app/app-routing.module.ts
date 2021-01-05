import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraduatesComponent } from './graduate/graduates/graduates.component';
import { GraduateDetailsComponent } from './graduate/graduate-details/graduate-details.component';
import { NewGraduateComponent } from './graduate/new-graduate/new-graduate.component';
import { GraduateEditingComponent } from './graduate/graduate-editing/graduate-editing.component';
import { CompaniesComponent } from './company/companies/companies.component';
import { CompanyFormComponent } from './company/company-form/company-form.component';
import { ContactsComponent } from './contact/contacts/contacts.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { JobsComponent } from './job/jobs/jobs.component'
import { JobFormComponent } from './job/job-form/job-form.component';
import { ChartsComponent } from './charts/charts.component';
import { UsersComponent } from './user/users/users.component';
import { LoginComponent } from './user/login/login.component';
import { ListsFormComponent } from './maintenance/lists-form/lists-form.component';
import { ListsComponent } from './maintenance/lists/lists.component';
import { ExprtWithSubjComponent } from './maintenance/exprt-with-subj/exprt-with-subj.component';
import { HomeComponent } from './home/home.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { PlacementsComponent } from './placements/placements.component';
import { Error403Component } from './messages/error403/error403.component';

const routes: Routes = [
    {path:'', component: HomeComponent },
    {path:'graduates', component: GraduatesComponent },
    {path:'graduate-details/:graduateID' ,component:GraduateDetailsComponent},
    {path:'new-graduate' ,component:NewGraduateComponent},
    {path:'graduate-editing/:graduateID' ,component:GraduateEditingComponent},
    {path:'companies' ,component:CompaniesComponent},
    {path:'company-form/:companyID',component:CompanyFormComponent},
    {path:'contacts/:companyID/:companyName',component:ContactsComponent},
    {path:'contact-form/:contactID/:companyID',component:ContactFormComponent},
    {path:'jobs',component:JobsComponent},
    {path:'job-form/:jobID',component:JobFormComponent},
    {path:'Placements',component:PlacementsComponent},
    {path:'Charts',component:ChartsComponent},
    {path:'login',component:LoginComponent},
    {path:'users',component:UsersComponent},
    {path:'user-form/:userID',component:UserFormComponent},
    {path:'list/:controller',component:ListsFormComponent},
    {path:'lists',component:ListsComponent},
    {path:'EwithS',component:ExprtWithSubjComponent},
    {path:'err403',component:Error403Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
