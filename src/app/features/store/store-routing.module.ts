import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreMainComponent } from './components/store-main/store-main.component';
import { AvailableAppsComponent } from './components/available-apps/available-apps.component';
import { EnabledAppsComponent } from './components/enabled-apps/enabled-apps.component';
import { AppDetailsComponent } from './components/app-details/app-details.component';
import { CreateAppComponent } from './components/create-app/create-app.component';
import { AppAuthGuard } from 'src/app/shared/guards/app-auth.guard';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: ':partner_id/store/home',
  //   pathMatch: 'full'
  // },
  {
    path: 'home',
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