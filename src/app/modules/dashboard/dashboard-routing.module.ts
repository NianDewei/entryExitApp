import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { routesDashBoard } from './dashboard.routing';
import { StoreModule } from '@ngrx/store';
import { entryExitReducer } from '../entry-exit/store/entry-exit.reducer';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: routesDashBoard },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    StoreModule.forFeature('entryExit', entryExitReducer),
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
