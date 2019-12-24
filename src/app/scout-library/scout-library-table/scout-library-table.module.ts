import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ScoutLibraryTableComponent } from './scout-library-table.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        ScoutLibraryTableComponent,
    ]
})
export class ScoutLibraryTableModule { }
