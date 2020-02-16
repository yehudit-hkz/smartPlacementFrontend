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

    ]
})
export class MaterialModule { }