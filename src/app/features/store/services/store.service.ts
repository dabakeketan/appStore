import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeWhile } from 'rxjs';
import { PartnerDataModel } from 'src/app/account/models/accountModel';
import { AccountService } from 'src/app/account/services/account.service';
import { BaseService } from 'src/app/base.service';
import { APIUrls, MNGUrls, UserRoles } from 'src/app/constants';

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

  imagePath: any;

  constructor(private baseService: BaseService, private router: Router,
    private accountService: AccountService) {
  }

  getSpotlightApps() {
    this.getRequest(MNGUrls.listApps + '?promoted=true')
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
    this.getRequest(MNGUrls.listApps)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            console.log('at login main all apps', response.body);
            this.allApps.next(response.body);
          }
        }
      });
  }

  getEnabledApps(isCustomerUser: boolean, partner_id: any, customer_name: any) {
    let finalURL = '';
    let xyz = APIUrls.partnerApps + partner_id;
    if (isCustomerUser) {
      finalURL = xyz + '/customer/' + customer_name + '/apps?enabled=true';
    } else {
      finalURL = xyz + '/apps?enabled=true';
    }
    this.getRequest(finalURL)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            console.log('at login main partner enabled apps', response.body);
            this.enabledApps.next(response.body);
          }
        }
      });
  }

  getAvailApps(isCustomerUser: boolean, partner_id: any, customer_name: any) {
    let finalURL = APIUrls.partnerApps + partner_id;
    if (isCustomerUser) {
      finalURL = finalURL + '/customer/' + customer_name + '/apps?enabled=false';
    } else {
      finalURL = finalURL + '/apps?enabled=false';
    }
    this.getRequest(finalURL)
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
    this.getRequest(MNGUrls + '/' + app_Id)
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

  disableApp(isCustomerUser:boolean, app_Id: any, user: PartnerDataModel) {
    let finalURL = '';
    if (isCustomerUser) {
      finalURL = APIUrls.customerApps + 'app?customer-name=' + user.customer_name
        + '&partner-id=' + user.partner_id + '&app-id=' + app_Id;
    } else {
      finalURL = APIUrls.partnerApps + user.partner_id + '/app/' + app_Id;
    }
    this.deleteRequest(finalURL)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            this.accountService.goHome();
          }
        }
      });
  }

  enableApp(isCustomerUser:boolean, app_Id: any, user: PartnerDataModel) {
    let finalURL = '';
    let reqObj: any = '';
    if (isCustomerUser) {
      finalURL = APIUrls.customerApps + 'app';
      reqObj = {
        customer_name: user.customer_name,
        partner_id: user.partner_id,
        app_id: app_Id,
        user_id: user.user_id,
        user_role: UserRoles.basic
      }
    } else {
      finalURL = APIUrls.partnerApps + user.partner_id + '/app/' + app_Id;
    }
    this.postRequest(reqObj ? reqObj : '', finalURL)
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
}
