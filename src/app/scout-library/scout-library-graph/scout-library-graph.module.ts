import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ScoutLibraryGraphComponent} from './scout-library-graph.component';

@NgModule({
  imports: [
    CommonModule,
    NgxGraphModule,
    NgxChartsModule,
  ],
  declarations: [
    ScoutLibraryGraphComponent
  ]
})
export class ScoutLibraryGraphModule { }
