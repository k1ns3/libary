import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScoutLibraryGraphComponent } from './scout-library-graph/scout-library-graph.component';
import { ScoutLibraryTableComponent } from './scout-library-table/scout-library-table.component';
import { ScoutLibraryComponent } from './scout-library.component';
import { ScoutLibraryTableDeplibComponent } from './scout-library-table-deplib/scout-library-table-deplib.component';

const appRoutes: Routes = [
  {
    path: '', component: ScoutLibraryComponent, children: [
      { path: '', redirectTo: 'dependencies', pathMatch: 'full' },
      { path: 'graph', component: ScoutLibraryGraphComponent },
      { path: 'projects', component: ScoutLibraryTableComponent },
      { path: 'dependencies', component: ScoutLibraryTableDeplibComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class ScoutLibraryRoutingModule { }
