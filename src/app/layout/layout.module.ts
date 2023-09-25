import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavSideBarComponent } from './components/nav-side-bar/nav-side-bar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    NavSideBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    NavSideBarComponent
  ]
})
export class LayoutModule { }
