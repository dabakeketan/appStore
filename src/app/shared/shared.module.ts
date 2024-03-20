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
import { EnabledDomainUsersComponent } from './components/grid-store/enabled-domain-users/enabled-domain-users.component';
import { DomainConfigValueRendererComponent } from './components/grid-store-cell-renderers/domain-config-value-renderer/domain-config-value-renderer.component';
import { DomainListComponent } from './components/grid-store/domain-list/domain-list.component';

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
       UserConfigValueRendererComponent,
       EnabledDomainUsersComponent,
       DomainConfigValueRendererComponent,
       DomainListComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    FormsModule
  ],
  exports: [CategoriesComponent, VendorAppListComponent,
    ProductsComponent, PartnerListComponent, VendorsListComponent, TiersListComponent,
    CustomersListComponent, DomainListComponent,
    EnabledCustomerUsersComponent, EnabledDomainUsersComponent],
  // providers: [authInterceptorProviders],
})
export class SharedModule { }
