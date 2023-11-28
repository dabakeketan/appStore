import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './components/manage/manage.component';
import { ManagePartnerComponent } from './components/manage-partner/manage-partner.component';
import { AppManageMainComponent } from './components/app-manage-main/app-manage-main.component';
import { MngAppAuthGuard } from '../shared/guards/mng-app-auth.guard';
import { VendorDetailsComponent } from './components/vendor-details/vendor-details.component';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/manage/oauth/login',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: ManageComponent
  },
  {
    path: 'partner',
    component: ManagePartnerComponent,
    canActivate: [MngAppAuthGuard]
  },
  {
    path: 'vendor',
    component: AppManageMainComponent,
    canActivate: [MngAppAuthGuard]
  },
  {
    path: 'vendor/:id',
    component: VendorDetailsComponent,
    canActivate: [MngAppAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }