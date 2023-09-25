import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BaseService {

  errorData: any;

  private errorStageMessage = new BehaviorSubject<any>({});
  currentErrorStageMessage = this.errorStageMessage.asObservable();

  setErrorData(errorData: any) {
    this.errorStageMessage.next(errorData);
  }

  constructor(private http: HttpClient,
    private router: Router) { }

  getData(url: string): Observable<any> {
    // this.spinner.show();
    return this.http.get<any>(url, { observe: 'response' }).pipe(
      tap({
        next: x => {
          // this.spinner.hide();
          // console.log(x); 
        },
        error: err => {
          // this.spinner.hide(); 
          // console.error(err);
          if (err.error.message) {
            //  alert(err.error.message);
          } else if (err.message) {
            //    alert(err.message);
          }
        }
      })
    );
  }

  getDataA(url: string): Observable<any> {
    // this.spinner.show();
    return this.http.get<any>(url).pipe(
      tap({
        next: x => {
          // this.spinner.hide();
          // console.log(x); 
        },
        error: err => {
          // this.spinner.hide(); 
          // console.error(err);
          if (err.error.message) {
            //  alert(err.error.message);
          } else if (err.message) {
            //    alert(err.message);
          }
        }
      })
    );
  }

  postData(reqObj: any, url: string): Observable<any> {
    // this.spinner.show();
    return this.http.post<any>(url, reqObj, { observe: 'response' }).pipe(
      tap({
        next: x => {
          // this.spinner.hide();
          // console.log('Post Method');
        },
        error: err => {
          // this.spinner.hide(); 
          // console.error(err);
          if (err.error.message) {
            //  alert(err.error.message);
          } else if (err.error.data) {
            //   console.log(err.error.data);
            // this.errorData = err.error.data;
            // this.setErrorData(this.errorData);
            // this.router.navigate(['/error']);
            // console.log('multiple', err.error.data);
          }
        }
      })
    )
  }

  putData(reqObj: any, url: string): Observable<any> {
    return this.http.put<any>(url, reqObj, { observe: 'response' }).pipe(
      tap({
        next: x => {
        },
        error: err => {
          if (err.error.message) {
          } else if (err.error.data) {
            ;
          }
        }
      })
    );
  }

  postDataWithoutAuth(url: string, reqObj: any): Observable<any> {
    // this.spinner.show();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(url, reqObj, httpOptions).pipe(
      tap({
        next: x => {
          // this.spinner.hide();
        },
        error: err => {
          // this.spinner.hide();
          console.error(err);
          if (err.error.message) {
            // alert(err.error.message);
          } else if (err.error.data) {
            console.log(err.error.data);
          }
        }
      })
    )
  }

  deleteRequest(url: string): Observable<any> {
    // const headers = new HttpHeaders({ 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    // 'Content-Type': 'text/plain' });
    return this.http.delete<any>(url, { observe: 'response' }).pipe(
      tap({
        next: x => {
          // this.spinner.hide();
        },
        error: err => {
          // this.spinner.hide();
          console.error(err);
          if (err.error.message) {
            // alert(err.error.message);
          } else if (err.error.data) {
            console.log(err.error.data);
          }
        }
      })
    );
  }

  handleError(error: any) {
    console.log(error);
  }
}
