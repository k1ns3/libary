import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatSelectModule } from '@angular/material';

import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ScoutLibraryGraphComponent } from './scout-library-graph.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    NgxGraphModule,
    NgxChartsModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ScoutLibraryGraphComponent
  ]
})
export class ScoutLibraryGraphModule { }
