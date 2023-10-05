import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppAuthGuard } from './shared/guards/app-auth.guard';
import { authInterceptorProviders } from './shared/helpers/auth.interceptor';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { routing } from './app.routing';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    routing,
    LayoutModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'timer' })

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [AppAuthGuard, authInterceptorProviders,
    // {
    //   provide: ROUTES,
    //   useFactory: () => {
    //     let routes: Routes = [];
    //     const abc = 'xyz';
    //     routes.push({
    //       path: abc,
    //       canActivate: [AppAuthGuard],
    //       canActivateChild: [AppAuthGuard],
    //       loadChildren: () => import('./features/store/store.module').then(m => m.StoreModule),
    //     });
    //     return [
    //       ...routes
    //     ]
    //   },
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
