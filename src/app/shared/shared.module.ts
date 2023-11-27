import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { PartnerListComponent } from './components/grid/partner-list/partner-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { RegStatusRendererComponent } from './components/cell-renderers/reg-status-renderer/reg-status-renderer.component';

@NgModule({
  declarations: [
  
    CategoriesComponent,
       ProductsComponent,
       PartnerListComponent,
       RegStatusRendererComponent
  ],
  imports: [
    CommonModule,
    AgGridModule
  ],
  exports: [CategoriesComponent,
    ProductsComponent, PartnerListComponent],
  // providers: [authInterceptorProviders],
})
export class SharedModule { }
