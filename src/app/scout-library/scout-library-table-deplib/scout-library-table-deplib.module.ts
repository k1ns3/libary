import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ScoutLibraryTableDeplibComponent } from './scout-library-table-deplib.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    declarations: [
        ScoutLibraryTableDeplibComponent,
    ]
})
export class ScoutLibraryTableDeplibModule { }
