import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PartnerRegComponent } from './components/partner-reg/partner-reg.component';
import { AppAuthGuard } from '../shared/guards/app-auth.guard';
import { StoreDefaultComponent } from './components/store-default/store-default.component';


const routes: Routes = [
  {
    path: 'main',
    component: StoreDefaultComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'createpartner',
    component: PartnerRegComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }