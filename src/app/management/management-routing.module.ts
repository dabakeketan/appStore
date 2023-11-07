import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './components/manage/manage.component';
import { ManagePartnerComponent } from './components/manage-partner/manage-partner.component';


const routes: Routes = [
//   {
//      path: '',
//      component: 
//     redirectTo: ':partner_name/store',
//      pathMatch: 'full'
//   },
  {
    path: 'main',
    component: ManageComponent
  },
  {
    path: 'partner',
    component: ManagePartnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }