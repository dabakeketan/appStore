import { HTTP_INTERCEPTORS, HttpEvent, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, NEVER, Observable, of, tap } from 'rxjs';
import { AlertService } from 'src/app/alert/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { ManagementService } from 'src/app/management/services/management.service';
import { mngAPIUrlAppender } from 'src/app/constants';
import { AccountService } from 'src/app/account/services/account.service';
const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  service_count = 0;

  constructor(private alertService: AlertService,
    private spinner: NgxSpinnerService, private managementService: ManagementService,
    private accountService: AccountService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.headers.get('Anonymous') === '') {
      const newHeaders = req.headers.delete('Anonymous')
      const newRequest = req.clone({ headers: newHeaders });
      return next.handle(newRequest).pipe(
        tap({
          next: (evt) => {
            // console.log('forkjoin success', evt);
          },
          error: (error: HttpErrorResponse) => {
            // console.log('forkjoin error', error);
          }
        })
      );
    } else if (req.headers.get('Anonymouswithtoken') === '') {
      let newRequest = req;
      let newHeaders;
      newHeaders = newRequest.headers.delete('Anonymouswithtoken');
      const mngToken = (this.managementService.getMngToken() && this.managementService.getMngToken().access_token) ? this.managementService.getMngToken().access_token : null;
      const appToken = (this.accountService.getUser() && this.accountService.getUser().access_token) ? this.accountService.getUser().access_token : null;
      let token;
      if (newRequest.url.search(mngAPIUrlAppender) > 0) {
        newRequest = newRequest.clone({ url: newRequest.url.replace(mngAPIUrlAppender, '') });
        token = mngToken;
      } else if (appToken) {
        token = appToken;
      }


      newHeaders = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        // 'ns-dest-server': serverProfile.url
      });

      if (token != null) {
        newRequest = req.clone({ headers: newHeaders });
      }
      return next.handle(newRequest).pipe(
        tap({
          next: (evt) => {
            // console.log('forkjoin success', evt);
          },
          error: (error: HttpErrorResponse) => {
            // console.log('forkjoin error', error);
          }
        })
      );
    } else {
      this.service_count++;
      let authReq = req;
      const mngToken = (this.managementService.getMngToken() && this.managementService.getMngToken().access_token) ? this.managementService.getMngToken().access_token : null;
      const appToken = (this.accountService.getUser() && this.accountService.getUser().access_token) ? this.accountService.getUser().access_token : null;
      let token;
      if (authReq.url.search(mngAPIUrlAppender) > 0) {
        authReq = authReq.clone({ url: authReq.url.replace(mngAPIUrlAppender, '') });
        token = mngToken;
      } else if (appToken) {
        token = appToken;
      }

      this.spinner.show();

      let headers;
      headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        // 'ns-dest-server': serverProfile.url
      });
      if (token != null) {
        authReq = authReq.clone({ headers });
      }

      // return next.handle(authReq);
      return next.handle(authReq).pipe(
        tap({
          next: (evt) => {
            if (evt instanceof HttpResponse) {
              this.service_count--;
              if (this.service_count === 0) {
                this.spinner.hide();
              }


              console.log('interc response success', evt);

              if (evt && evt.ok && evt.status === 204) {
                // const location = evt.headers.get('Location');
                // console.log('headers all', evt.headers);
                const location = evt.headers.get('X-Location') || evt.headers.get('x-location')
                  || evt.headers.get('X-location');
                if (location) {
                  window.location.href = location;
                }
                // console.log('200', evt, location);
              }

              // if (evt.status === 200 && evt.body && evt.body.message) {
              //   const obj = {
              //     type: 'success',
              //     text: evt.body.message
              //   }
              //   this.alertService.alertSubject.next(obj);
              // }
            }
          },
          error: (error: HttpErrorResponse) => {
            if (error instanceof HttpErrorResponse) {
              this.service_count--;
              if (this.service_count === 0) {
                this.spinner.hide();
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
                // alert(error.error.message);
                const obj = {
                  type: 'error',
                  text: error.error.message
                }
                this.alertService.alertSubject.next(obj);
              } else if (error.message) {
                // alert(error.message);
                const obj = {
                  type: 'error',
                  text: error.message
                }
                this.alertService.alertSubject.next(obj);
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
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];