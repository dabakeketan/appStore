import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreMainComponent } from './components/store-main/store-main.component';
import { EnabledAppsComponent } from './components/enabled-apps/enabled-apps.component';
import { AvailableAppsComponent } from './components/available-apps/available-apps.component';
import { StoreRoutingModule } from './store-routing.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselAppsComponent } from './components/carousel-apps/carousel-apps.component';
import { AppDetailsComponent } from './components/app-details/app-details.component';
import { SpotlightAppsComponent } from './components/spotlight-apps/spotlight-apps.component';
import { CreateAppComponent } from './components/create-app/create-app.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    StoreMainComponent,
    EnabledAppsComponent,
    AvailableAppsComponent,
    CarouselAppsComponent,
    AppDetailsComponent,
    SpotlightAppsComponent,
    CreateAppComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    CarouselModule,
    SharedModule,
    
    // SweetAlert2Module.forRoot()
  ],
  exports: [CarouselAppsComponent, SpotlightAppsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class StoreModule { }
