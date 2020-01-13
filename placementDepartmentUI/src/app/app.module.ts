import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HttpClientModule}from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import{MaterialModule}from'./material.module';

import { GraduatesComponent } from './graduates/graduates.component';
import { GraduateDetailsComponent } from './graduate-details/graduate-details.component';
import {StamService}from './services/stam.service';
import { from } from 'rxjs';

export const ROUTES: Routes=[
  { path: 'graduates', component: GraduatesComponent },
  {path:'graduate-details/:graduateID' ,component:GraduateDetailsComponent}
];
 

@NgModule({
  declarations: [
    AppComponent,
    GraduatesComponent,
    GraduateDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
  ],
  
  providers: [StamService],
  bootstrap: [AppComponent]
})
export class AppModule { }


