import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraduatesComponent } from './graduates/graduates.component';
import { GraduateDetailsComponent } from './graduate-details/graduate-details.component';
import { NewGraduateComponent } from './new-graduate/new-graduate.component';
import { GraduateEditingComponent } from './graduate-editing/graduate-editing.component';

const routes: Routes = [
    { path: 'graduates', component: GraduatesComponent },
    {path:'graduate-details/:graduateID' ,component:GraduateDetailsComponent},
   {path:'new-graduate' ,component:NewGraduateComponent},
   {path:'graduate-editing/:graduateID' ,component:GraduateEditingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
