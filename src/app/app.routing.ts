

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { AppAuthGuard } from './shared/guards/app-auth.guard';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'dashboard/main',
  //   // pathMatch: 'full'
  // },
  {
    path: 'dashboard',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  // {
  //   path: 'store',
  //   // canActivate: [AppAuthGuard],
  //   // canActivateChild: [AppAuthGuard],
  //   loadChildren: () => import('./features/store/store.module').then(m => m.StoreModule)
  // },
  {
    path: ':partner_id/store',
    // canActivate: [AppAuthGuard],
    // canActivateChild: [AppAuthGuard],
    loadChildren: () => import('./features/store/store.module').then(m => m.StoreModule)
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
