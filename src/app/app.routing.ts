

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'dashboard/main',
  //   // pathMatch: 'full'
  // },
  {
    path: 'manage',
    loadChildren: () => import('./management/management.module').then(m => m.ManagementModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: ':partner_name',
    // canActivate: [AppAuthGuard],
    // canActivateChild: [AppAuthGuard],
    loadChildren: () => import('./features/store/store.module').then(m => m.StoreModule),
    // component: StoreWrapperComponent
  },
  // {
  //   path: 'error',
  //   component: ErrorComponent,
  //   data: { pageTitle: 'Error' },
  // },

  { path: '**', redirectTo: 'dashboard/main' }
  // {path: '**', redirectTo: 'store'}

];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes, { useHash: false });
