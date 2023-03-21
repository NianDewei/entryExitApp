import { Routes } from '@angular/router';
export const routesDashBoard: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../entry-exit/pages/statistics/statistics.component').then(
        (c) => c.StatisticsComponent
      ),
  },
  {
    path: 'detail',
    loadComponent: () =>
      import('../entry-exit/pages/detail/detail.component').then(
        (c) => c.DetailComponent
      ),
  },
  {
    path: 'entry-and-exit',
    loadComponent: () =>
      import('../entry-exit/pages/entry-exit/entry-exit.component').then(
        (c) => c.EntryExitComponent
      ),
  },
];
