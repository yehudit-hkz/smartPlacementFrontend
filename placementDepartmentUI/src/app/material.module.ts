import { NgModule } from '@angular/core';

import {
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatDividerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MAT_DATE_LOCALE,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatChipsModule,
    

} from '@angular/material';
import { MaterialFileInputModule } from 'ngx-material-file-input';

@NgModule({
    imports: [
        MatToolbarModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatExpansionModule,
        MatDividerModule,
        MatCheckboxModule,
        MatDialogModule,
        MatDatepickerModule, 
        MatNativeDateModule,
        MatSelectModule,
        MatSnackBarModule,
        MaterialFileInputModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        MatStepperModule,
        MatAutocompleteModule,
        MatChipsModule,

    ],
    exports: [
        MatToolbarModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatExpansionModule,
        MatDividerModule,
        MatCheckboxModule,
        MatDialogModule,
        MatDatepickerModule, 
        MatNativeDateModule,
        MatSelectModule,
        MatSnackBarModule,
        MaterialFileInputModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        MatStepperModule,
        MatAutocompleteModule,
        MatChipsModule,

    ],
    providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'he-IL' },
    ]
})
export class MaterialModule { }