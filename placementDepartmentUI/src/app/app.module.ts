import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HttpClientModule}from '@angular/common/http';
import{MaterialModule}from'./material.module';

import { GraduatesComponent } from './graduates/graduates.component';
import { GraduateDetailsComponent } from './graduate-details/graduate-details.component';
import {StamService}from './services/stam.service';
import { from } from 'rxjs';
import { DeletionDialogComponent } from './deletion-dialog/deletion-dialog.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { GraduateFormComponent } from './graduate-form/graduate-form.component';
import { NewGraduateComponent } from './new-graduate/new-graduate.component';
import { GraduateEditingComponent } from './graduate-editing/graduate-editing.component';


 

@NgModule({
  declarations: [
    AppComponent,
    GraduatesComponent,
    GraduateDetailsComponent,
    DeletionDialogComponent,
    GraduateFormComponent,
    NewGraduateComponent,
    GraduateEditingComponent
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


