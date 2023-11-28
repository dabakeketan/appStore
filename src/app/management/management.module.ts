import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import { ManageComponent } from './components/manage/manage.component';
import { ManagePartnerComponent } from './components/manage-partner/manage-partner.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CreateAppComponent } from './components/create-app/create-app.component';
import { AppManageMainComponent } from './components/app-manage-main/app-manage-main.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { VendorDetailsComponent } from './components/vendor-details/vendor-details.component';



@NgModule({
  declarations: [ManageComponent, ManagePartnerComponent, CreateAppComponent, AppManageMainComponent, VendorDetailsComponent],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    SharedModule,
    FormsModule,
    SweetAlert2Module.forRoot()
  ]
})
export class ManagementModule { }
