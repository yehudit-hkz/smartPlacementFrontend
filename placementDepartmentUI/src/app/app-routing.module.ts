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


const routes: Routes = [
    { path: 'graduates', component: GraduatesComponent },
    {path:'graduate-details/:graduateID' ,component:GraduateDetailsComponent},
   {path:'new-graduate' ,component:NewGraduateComponent},
   {path:'graduate-editing/:graduateID' ,component:GraduateEditingComponent},
   {path:'companies' ,component:CompaniesComponent},
   {path:'company-form/:companyID',component:CompanyFormComponent},
   {path:'contacts/:companyID',component:ContactsComponent},
   {path:'contact-form/:contactID',component:ContactFormComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
