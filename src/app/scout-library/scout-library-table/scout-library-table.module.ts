import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatCheckboxModule, MatInputModule, MatTableModule } from '@angular/material';

import { ScoutLibraryTableComponent } from './scout-library-table.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatTableModule
    ],
    declarations: [
        ScoutLibraryTableComponent,
    ]
})
export class ScoutLibraryTableModule { }
