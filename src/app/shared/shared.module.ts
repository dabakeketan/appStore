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

@NgModule({
  declarations: [
  
    CategoriesComponent,
       ProductsComponent,
       PartnerListComponent,
       RegStatusRendererComponent,
       VendorsListComponent,
       VendorAppListComponent,
       VendorAppPromotedRendererComponent
  ],
  imports: [
    CommonModule,
    AgGridModule
  ],
  exports: [CategoriesComponent, VendorAppListComponent,
    ProductsComponent, PartnerListComponent, VendorsListComponent],
  // providers: [authInterceptorProviders],
})
export class SharedModule { }
