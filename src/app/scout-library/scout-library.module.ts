import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatButtonModule, MatIconModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { ScoutLibraryRoutingModule } from './scout-library-routing.module';
import { ScoutLibraryGraphModule } from './scout-library-graph/scout-library-graph.module';
import { ScoutLibraryTableModule } from './scout-library-table/scout-library-table.module';
import { ScoutLibraryTableDeplibModule } from './scout-library-table-deplib/scout-library-table-deplib.module';
import { ScoutLibraryComponent } from './scout-library.component';



@NgModule({
  imports: [
    CommonModule,
    ScoutLibraryRoutingModule,
    ReactiveFormsModule,
    ScoutLibraryGraphModule,
    ScoutLibraryTableModule,
    ScoutLibraryTableDeplibModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    ScoutLibraryComponent,
  ],
  exports: [
    ScoutLibraryComponent
  ]
})
export class ScoutLibraryModule { }
