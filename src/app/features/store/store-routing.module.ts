import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreMainComponent } from './components/store-main/store-main.component';
import { AvailableAppsComponent } from './components/available-apps/available-apps.component';
import { EnabledAppsComponent } from './components/enabled-apps/enabled-apps.component';
import { AppDetailsComponent } from './components/app-details/app-details.component';
import { CreateAppComponent } from './components/create-app/create-app.component';
import { AppAuthGuard } from 'src/app/shared/guards/app-auth.guard';
import { StoreWrapperComponent } from './components/store-wrapper/store-wrapper.component';


const routes: Routes = [
  {
    path: '',
    component: StoreWrapperComponent
    // redirectTo: ':partner_name/store',
    // pathMatch: 'full'
  },
  {
    path: 'store',
    component: StoreMainComponent,
    canActivate: [AppAuthGuard]
  },
  {
    path: 'enabled',
    component: EnabledAppsComponent,
    canActivate: [AppAuthGuard]
  },
  {
    path: 'available',
    component: AvailableAppsComponent,
    canActivate: [AppAuthGuard]
  },
  {
    path: 'app/:id',
    component: AppDetailsComponent,
    canActivate: [AppAuthGuard]
  },
  // {
  //   path: 'createApp',
  //   component: CreateAppComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }