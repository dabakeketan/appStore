import { HTTP_INTERCEPTORS, HttpEvent, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, NEVER, Observable, of, tap } from 'rxjs';
const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  service_count = 0;

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.service_count++;
    let authReq = req;
    let token;
    let headers;
    if (token != null) {
      authReq = req.clone({ headers });
    }

    // return next.handle(authReq);
    return next.handle(authReq).pipe(
      tap({
        next: (evt) => {
          if (evt instanceof HttpResponse) {
            this.service_count--;
            if (this.service_count === 0) {
              // this.spinner.hide();
            }

            // console.log('interc response success', evt);

            if (evt.status === 207 && evt.body) {
              const errorData = evt.body.data ? evt.body.data : '';
              if (errorData) {
                errorData.forEach((element: any) => {
                  element.errorMessages = [];
                  if (element.error_messages) {
                    for (const [key, value] of Object.entries(element.error_messages)) {
                      element.errorMessages.push(`${value}`);
                      // console.log(`${value} `);
                    }
                  }
                });
              }
              const tempObj = {
                errorData: errorData,
                errorMetaData: evt.body.metadata
              }
              // this.sharedService.errorDataSub.next(tempObj);
            }
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error instanceof HttpErrorResponse) {
            this.service_count--;
            if (this.service_count === 0) {
              // this.spinner.hide();
            }
            console.log('interc response error', error);
            if (error.error && error.error.metadata) {
              const errorData = error.error.data ? error.error.data : '';
              if (errorData) {
                errorData.forEach((element: any) => {
                  element.errorMessages = [];
                  if (element.error_messages) {
                    for (const [key, value] of Object.entries(element.error_messages)) {
                      element.errorMessages.push(`${value}`);
                      // console.log(`${value} `);
                    }
                  }
                });
              }
              const tempObj = {
                errorData: errorData,
                errorMetaData: error.error.metadata
              }
              // this.sharedService.errorDataSub.next(tempObj);
            } else if (error.error && error.error.message) {
              alert(error.error.message);
            } else if (error.message) {
              alert(error.message);
            } else {
              alert('Something went wrong!')
            }
            // const msg = (error.error && error.error.message) ? error.error.message : error.message ? error.message : 'Something went wrong!';
            // alert(msg);
          }
        }
      })
    );

  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];