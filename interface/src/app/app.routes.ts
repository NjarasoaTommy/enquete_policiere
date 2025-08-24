import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'manage-accusation',
    loadComponent: () =>
      import(
        './manage-accusation-modal/manage-accusation-modal.component'
      ).then((m) => m.ManageAccusationModalComponent),
  },
  {
    path: 'crimes',
    loadComponent: () =>
      import('./list-crime/list-crime.component').then(
        (m) => m.ListCrimeComponent
      ),
  },
  {
    path: 'accusations',
    loadComponent: () =>
      import('./list-accusation/list-accusation.component').then(
        (m) => m.ListAccusationComponent
      ),
  },
];
