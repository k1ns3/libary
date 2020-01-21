import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ScoutLibraryTableDeplibComponent } from './scout-library-table-deplib.component';
import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule
    ],
    declarations: [
        ScoutLibraryTableDeplibComponent,
    ]
})
export class ScoutLibraryTableDeplibModule { }
