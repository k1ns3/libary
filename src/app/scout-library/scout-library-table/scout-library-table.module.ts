import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material';

import { ScoutLibraryTableComponent } from './scout-library-table.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule
    ],
    declarations: [
        ScoutLibraryTableComponent,
    ]
})
export class ScoutLibraryTableModule { }
