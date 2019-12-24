import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ScoutLibraryLoginComponent } from './scout-library-login.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        ScoutLibraryLoginComponent,
    ],
})
export class ScoutLibraryLoginModule { }
