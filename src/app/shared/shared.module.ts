import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { PartnerListComponent } from './components/grid/partner-list/partner-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { RegStatusRendererComponent } from './components/cell-renderers/reg-status-renderer/reg-status-renderer.component';
import { VendorsListComponent } from './components/grid/vendors-list/vendors-list.component';
import { VendorAppListComponent } from './components/grid/vendor-app-list/vendor-app-list.component';
import { VendorAppPromotedRendererComponent } from './components/cell-renderers/vendor-app-promoted-renderer/vendor-app-promoted-renderer.component';
import { EditButtonRendererComponent } from './components/cell-renderers/edit-button-renderer/edit-button-renderer.component';
import { TiersListComponent } from './components/grid/tiers-list/tiers-list.component';
import { TierNameRendererComponent } from './components/cell-renderers/tier-name-renderer/tier-name-renderer.component';
import { CustomersListComponent } from './components/grid-store/customers-list/customers-list.component';
import { EnabledCustomerUsersComponent } from './components/grid-store/enabled-customer-users/enabled-customer-users.component';
import { UserConfigValueRendererComponent } from './components/grid-store-cell-renderers/user-config-value-renderer/user-config-value-renderer.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  
    CategoriesComponent,
       ProductsComponent,
       PartnerListComponent,
       RegStatusRendererComponent,
       VendorsListComponent,
       VendorAppListComponent,
       VendorAppPromotedRendererComponent,
       EditButtonRendererComponent,
       TiersListComponent,
       TierNameRendererComponent,
       CustomersListComponent,
       EnabledCustomerUsersComponent,
       UserConfigValueRendererComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    FormsModule
  ],
  exports: [CategoriesComponent, VendorAppListComponent,
    ProductsComponent, PartnerListComponent, VendorsListComponent, TiersListComponent,
    CustomersListComponent,
    EnabledCustomerUsersComponent],
  // providers: [authInterceptorProviders],
})
export class SharedModule { }
