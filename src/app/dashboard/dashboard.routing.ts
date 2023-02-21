import { Routes } from '@angular/router';
export const routesDashBoard: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../entry-exit/statistics/statistics.component').then(
        (c) => c.StatisticsComponent
      ),
  },
  {
    path: 'detail',
    loadComponent: () =>
      import('../entry-exit/detail/detail.component').then(
        (c) => c.DetailComponent
      ),
  },
  {
    path: 'entry-and-exit',
    loadComponent: () =>
      import('../entry-exit/entry-exit/entry-exit.component').then(
        (c) => c.EntryExitComponent
      ),
  },
];
