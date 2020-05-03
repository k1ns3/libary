import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ScoutLibraryLoginComponent } from './scout-library-login.component';
import {
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatNativeDateModule
} from '@angular/material';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatNativeDateModule
    ],
    declarations: [
        ScoutLibraryLoginComponent,
    ],
})
export class ScoutLibraryLoginModule { }
