import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [
  
    CategoriesComponent,
       ProductsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CategoriesComponent,
    ProductsComponent],
  // providers: [authInterceptorProviders],
})
export class SharedModule { }
