import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertMainComponent } from './alert-main/alert-main.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



@NgModule({
  declarations: [
    AlertMainComponent
  ],
  imports: [
    CommonModule,
    SweetAlert2Module.forRoot()
  ],
  exports: [AlertMainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AlertModule { }
