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
    return this.http.get<any>(url, { observe: 'response' });
  }

  getDataText(url: string): Observable<any> {
    // this.spinner.show();
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get(url, { headers, responseType: 'text', observe: 'response' });
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
        },
        error: err => {
          if (err.error.message) {
          } else if (err.error.data) {
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
            
          }
        }
      })
    );
  }

  putDataForkJoinSkipIntercept(reqObj: any, url: string): Observable<any> {
    const headers = new HttpHeaders().set('Anonymous', '');
    return this.http.put<any>(url, reqObj, { headers, observe: 'response' }).pipe(
      tap({
        next: x => {
        },
        error: err => {
          if (err.error.message) {
          } else if (err.error.data) {
            
          }
        }
      })
    );
  }

  putDataForkJoinWithToken(reqObj: any, url: string): Observable<any> {
    const headers = new HttpHeaders().set('Anonymouswithtoken', '');
    return this.http.put<any>(url, reqObj, { headers, observe: 'response' }).pipe(
      tap({
        next: x => {
        },
        error: err => {
          if (err.error.message) {
          } else if (err.error.data) {
            
          }
        }
      })
    );
  }

  getDataForkJoinWithToken(url: string): Observable<any> {
    const headers = new HttpHeaders().set('Anonymouswithtoken', '');
    return this.http.get<any>(url, { headers, observe: 'response' });
  }

  postDataForkJoinWithToken(reqObj: any, url: string): Observable<any> {
    const headers = new HttpHeaders().set('Anonymouswithtoken', '');
    return this.http.post<any>(url, reqObj, { headers, observe: 'response' }).pipe(
      tap({
        next: x => {
        },
        error: err => {
          if (err.error.message) {
          } else if (err.error.data) {
            
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

  deleteRequestForkJoinWithToken(url: string): Observable<any> {
    const headers = new HttpHeaders().set('Anonymouswithtoken', '');
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

  deleteRequestA(reqObject: any, url: string): Observable<any> {
    const options: { headers: any; observe: any; body: any; } = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: reqObject,
      observe: 'response'
    }
    return this.http.delete<any>(url, options).pipe(
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

  deleteRequestForkJoinWithTokenA(reqObject: any, url: string): Observable<any> {
    const options: { headers: any; observe: any; body: any; } = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Anonymouswithtoken': '' }),
      body: reqObject,
      observe: 'response'
    }
    return this.http.delete<any>(url, options).pipe(
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

  poutRequestWithFormData(contentType: any, reqObject: any, URL: any): Observable<any> {
    if (contentType) {
      const headers = new HttpHeaders({ 'Content-Type': contentType });
    }
    return this.http.put<Blob>(URL, reqObject, {
      withCredentials: true
    }).pipe(
      tap(data => {
        if (data) {
          // console.log('Error Message');
        } else {
          // console.log('Data at base', data);
        }
      }, error => {
        console.log('Error at base service post request with form data call', error);
      })
    );
  }

  handleError(error: any) {
    console.log(error);
  }
}
