import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import { ManageComponent } from './components/manage/manage.component';
import { ManagePartnerComponent } from './components/manage-partner/manage-partner.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ManageComponent, ManagePartnerComponent],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ManagementModule { }
