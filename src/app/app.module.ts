import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppAuthGuard } from './shared/guards/app-auth.guard';
import { authInterceptorProviders } from './shared/helpers/auth.interceptor';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    routing,
    LayoutModule,
    BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [AppAuthGuard, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
