import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { PartnerRegComponent } from './components/partner-reg/partner-reg.component';
import { SharedModule } from '../shared/shared.module';
import { StoreDefaultComponent } from './components/store-default/store-default.component';
import { StoreModule } from '../features/store/store.module';



@NgModule({
  declarations: [
    LoginComponent,
    PartnerRegComponent,
    StoreDefaultComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    SharedModule,
    StoreModule
  ]
})
export class AccountModule { }
