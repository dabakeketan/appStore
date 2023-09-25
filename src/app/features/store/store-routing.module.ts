import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreMainComponent } from './components/store-main/store-main.component';
import { AvailableAppsComponent } from './components/available-apps/available-apps.component';
import { EnabledAppsComponent } from './components/enabled-apps/enabled-apps.component';
import { AppDetailsComponent } from './components/app-details/app-details.component';
import { CreateAppComponent } from './components/create-app/create-app.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/store/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: StoreMainComponent
  },
  {
    path: 'user',
    component: EnabledAppsComponent
  },
  {
    path: 'available',
    component: AvailableAppsComponent
  },
  {
    path: 'details',
    component: AppDetailsComponent
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