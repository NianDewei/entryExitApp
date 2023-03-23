import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/guard/auth.guard';
export const routesDashBoard: Routes = [
  {
    path: '',
    canLoad: [AuthGuard],
    loadComponent: () =>
      import('../entry-exit/pages/statistics/statistics.component').then(
        (c) => c.StatisticsComponent
      ),
  },
  {
    path: 'detail',
    canLoad: [AuthGuard],
    loadComponent: () =>
      import('../entry-exit/pages/detail/detail.component').then(
        (c) => c.DetailComponent
      ),
  },
  {
    path: 'entry-and-exit',
    canLoad: [AuthGuard],
    loadComponent: () =>
      import('../entry-exit/pages/entry-exit/entry-exit.component').then(
        (c) => c.EntryExitComponent
      ),
  },
];
