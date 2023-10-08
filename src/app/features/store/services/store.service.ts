import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeWhile } from 'rxjs';
import { AccountService } from 'src/app/account/services/account.service';
import { BaseService } from 'src/app/base.service';
import { APIUrls } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  spotlightApps = new Subject();

  allApps = new Subject();

  enabledApps = new Subject();

  availApps = new Subject();

  appDetailsSubject = new Subject();

  destroySubscription = false;

  imagePath:any;

  constructor(private baseService: BaseService, private router: Router,
    private accountService: AccountService) { }

  getSpotlightApps() {
    this.getRequest(APIUrls.spotLightApps)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            console.log('at login main spotlight apps', response.body);
            this.spotlightApps.next(response.body);
          }
        }
      });
  }

  getAllApps() {
    this.getRequest(APIUrls.listApps)
    .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        if (response && response.status === 200) {
          console.log('at login main all apps', response.body);
          this.allApps.next(response.body);
        }
      }
    });
  }

  getEnabledApps(partner_id: string) {
    this.getRequest(APIUrls.partnerApps + partner_id + '/apps?enabled=true')
    .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        if (response && response.status === 200) {
          console.log('at login main partner enabled apps', response.body);
          this.enabledApps.next(response.body);
        }
      }
    });
  }

  getAvailApps(partner_id: string) {
    this.getRequest(APIUrls.partnerApps + partner_id + '/apps?enabled=false')
    .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        if (response && response.status === 200) {
          console.log('at login main partner avail apps', response.body);
          this.availApps.next(response.body);
        }
      }
    }); 
  }

  getAppDetails(app_Id: any) {
    this.getRequest(APIUrls.appDetails + app_Id)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            console.log('app details', response.body);
            this.appDetailsSubject.next(response.body);
          }
        },
        error: (err: any) => {
          // this.orgListDataSub.next(null);
        }
      });
  }

  disableApp(partner_id: any, app_Id: any) {
    this.deleteRequest(APIUrls.partnerApps + partner_id + '/app/' + app_Id)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            this.accountService.goHome();
          }
        }
      });
  }

  enableApp(partner_id: any, app_Id: any) {
    this.postRequest('', APIUrls.partnerApps + partner_id + '/app/' + app_Id)
    .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        if (response && response.status === 200) {
         this.accountService.goHome();
        }
      }
    });
  }

  getRequest(reqUrl: string, urlParams?: any) {
    let urlData = '';
    if (urlParams && urlParams.length) {
      urlParams.forEach((val: any) => {
        urlData += '&' + val.paramLabel + '=' + val.paramValue
      });
    }
    return this.baseService.getData(reqUrl + (urlData ? urlData : ''));
  }

  postRequest(reqObj: any, reqUrl: string, urlParams?: any) {
    let urlData = '';
    if (urlParams && urlParams.length) {
      urlParams.forEach((val: any) => {
        urlData += '&' + val.paramLabel + '=' + val.paramValue
      });
    }
    return this.baseService.postData(reqObj, reqUrl + (urlData ? urlData : ''));
  }

  deleteRequest(deleteUrl: string, urlParams?: any, empId?: any) {
    let urlData = '';
    if (urlParams && urlParams.length) {
      urlParams.forEach((val: any) => {
        urlData += '&' + val.paramLabel + '=' + val.paramValue
      });
    }
    return this.baseService.deleteRequest(deleteUrl + (urlData ? urlData : ''));
  }

  // goHome() {
  //   this.router.navigateByUrl('store/home');
  // }
}
