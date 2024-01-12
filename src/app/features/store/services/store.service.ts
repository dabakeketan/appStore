import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, forkJoin, takeWhile } from 'rxjs';
import { PartnerDataModel } from 'src/app/account/models/accountModel';
import { AccountService } from 'src/app/account/services/account.service';
import { BaseService } from 'src/app/base.service';
import { APIUrls, MNGUrls, UserRoles } from 'src/app/constants';
import { AppDataModel, CustomerEnabledUsersDataModel } from '../models/storeModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/alert/services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  spotlightApps = new Subject();

  allApps = new Subject();

  enabledApps = new Subject();

  availApps = new Subject();

  appDetailsSubject = new Subject();

  customerUsersDataSub = new Subject();

  customerEnabledUsersDataSub = new Subject();

  destroySubscription = false;

  imagePath: any;

  tiersArrDataSub = new Subject();

  updateUsersDataSub = new Subject();

  constructor(private baseService: BaseService, private router: Router, private alertService: AlertService,
    private accountService: AccountService, private spinner: NgxSpinnerService) {
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


  getAppTiers(app_id: string) {
    const url = MNGUrls.vendorAppBase + '/' + app_id + '/tiers';
    this.getRequest(url)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            this.tiersArrDataSub.next(response.body);
          }
        },
        error: (err: any) => {
          this.tiersArrDataSub.next(null);
        }
      });
  }

  getCustomerUsers(app_id: string, user: PartnerDataModel) {
    let url = APIUrls.partnerApps + user.partner_id + '/customer/' +
      user.customer_name + '/users';
    this.getRequest(url)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            this.customerUsersDataSub.next(response.body);
          }
        },
        error: (err: any) => {
          this.customerUsersDataSub.next(null);
        }
      });
  }

  getCustomerUserConfigs(app_id: string, user: PartnerDataModel) {
    let url = APIUrls.partnerApps + user.partner_id + '/app/' + app_id + '/customer/' +
      user.customer_name + '/user-config/configs';
    this.getRequest(url)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            this.customerEnabledUsersDataSub.next(response.body);
          }
        },
        error: (err: any) => {
          this.customerEnabledUsersDataSub.next(null);
        }
      });
  }

  enableDisableUsers(customerEnabledUsers: Array<CustomerEnabledUsersDataModel>, user: PartnerDataModel, appDetailsData: AppDataModel) {
    this.spinner.show();
    let enableReqObj: any = [];
    let userConfigObjToEnable: any = [];
    let disableReqObj: any = {};
    let userConfigObjToDisable: any = [];
    if (appDetailsData.user_mgmt_enabled && appDetailsData.user_tiers_enabled) {
      let usersToDisable: any = [];
      customerEnabledUsers.forEach(item => {
        let tempObj = {};

        if (item.config_value !== 'Disabled') {
          tempObj = {
            customer_name: user.customer_name,
            partner_id: user.partner_id,
            app_id: appDetailsData.app_id,
            user_id: item.user + '@' + user.customer_name,
            user_role: item.config_value
          }
          enableReqObj.push(tempObj);

          const tempObjA = {
            user: item.user,
            config_value: item.config_value
          };
          userConfigObjToEnable.push(tempObjA);

        } else {
          usersToDisable.push(item.user + '@' + user.customer_name);
          const tempObjA = {
            user: item.user,
            config_value: item.config_value
          };
          userConfigObjToDisable.push(tempObjA);
        }
      });
      disableReqObj = {
        'users': usersToDisable
      };
    } else if (appDetailsData.user_mgmt_enabled && !appDetailsData.user_tiers_enabled) {
      let usersToDisable: any = [];
      customerEnabledUsers.forEach(item => {
        let tempObj = {};
        if (item.status) {
          tempObj = {
            customer_name: user.customer_name,
            partner_id: user.partner_id,
            app_id: appDetailsData.app_id,
            user_id: item.user + '@' + user.customer_name,
            user_role: item.config_value
          }
          enableReqObj.push(tempObj);

          const tempObjA = {
            user: item.user,
            config_value: item.config_value
          };
          userConfigObjToEnable.push(tempObjA);

        } else {
          usersToDisable.push(item.user + '@' + user.customer_name);

          const tempObjA = {
            user: item.user,
            config_value: item.config_value
          };
          userConfigObjToDisable.push(tempObjA);
        }
      });
      disableReqObj = {
        'users': usersToDisable
      };
    }
    const enableUrl = APIUrls.partnerApps + user.partner_id + '/customer/' + user.customer_name + '/app';
    const createConfigUrl = APIUrls.partnerApps + user.partner_id + '/app/' + appDetailsData.app_id + '/customer/' + user.customer_name + '/user-config/configs';
    const disableUrl = APIUrls.partnerApps + user.partner_id + '/customer/' + user.customer_name + '/app/' + appDetailsData.app_id;
    const deleteConfigUrl = APIUrls.partnerApps + user.partner_id + '/app/' + appDetailsData.app_id + '/customer/' + user.customer_name + '/user-config/configs';
    const requestA = this.postDataForkJoinWithToken(enableReqObj, enableUrl);
    const requestB = this.postDataForkJoinWithToken(userConfigObjToEnable, createConfigUrl);
    const requestC = this.deleteRequestForkJoinWithTokenA(disableReqObj, disableUrl);
    const requestD = this.deleteRequestForkJoinWithTokenA(userConfigObjToDisable, deleteConfigUrl);

    const forkArray = [];
    if (enableReqObj && enableReqObj.length) {
      forkArray.push(requestA);
    }
    if (userConfigObjToEnable && userConfigObjToEnable.length) {
      forkArray.push(requestB);
    }
    if (disableReqObj && disableReqObj.users && disableReqObj.users.length) {
      forkArray.push(requestC);
    }
    if (userConfigObjToDisable && userConfigObjToDisable.length) {
      forkArray.push(requestD);
    }
    forkJoin(forkArray)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe((forkResponse: any) => {
        if (forkResponse && forkResponse.length) {
          this.spinner.hide();
          this.updateUsersDataSub.next(true);
        }
      }, (error) => {
        console.log('error at service', error);
        this.spinner.hide();
        const obj = {
          type: 'error',
          text: 'Something went wrong'
        }
        this.alertService.alertSubject.next(obj);
      });
  }

  disableWithUsers(customerEnabledUsers: Array<CustomerEnabledUsersDataModel>, user: PartnerDataModel, appDetailsData: AppDataModel) {
    this.spinner.show();
    let disableReqObj: any = {};
    let userConfigObjToDisable: any = [];
    let usersToDisable: any = [];
    customerEnabledUsers.forEach(item => {
      usersToDisable.push(item.user + '@' + user.customer_name);
      const tempObjA = {
        user: item.user,
        config_value: item.config_value
      };

      userConfigObjToDisable.push(tempObjA);
    });
    disableReqObj = {
      'users': usersToDisable
    };
    const disableUrl = APIUrls.partnerApps + user.partner_id + '/customer/' + user.customer_name + '/app/' + appDetailsData.app_id;
    const deleteConfigUrl = APIUrls.partnerApps + user.partner_id + '/app/' + appDetailsData.app_id + '/customer/' + user.customer_name + '/user-config/configs';
    const requestC = this.deleteRequestForkJoinWithTokenA(disableReqObj, disableUrl);
    const requestD = this.deleteRequestForkJoinWithTokenA(userConfigObjToDisable, deleteConfigUrl);
    forkJoin(requestC, requestD)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe((forkResponse: any) => {
        if (forkResponse && forkResponse.length) {
          this.spinner.hide();
          this.accountService.goHome();
        }
      }, (error) => {
        console.log('error at service', error);
        this.spinner.hide();
        const obj = {
          type: 'error',
          text: 'Something went wrong'
        }
        this.alertService.alertSubject.next(obj);
      });
  }

  enableApp(isCustomerUser: boolean, appDetailsData: AppDataModel, user: PartnerDataModel) {
    if (isCustomerUser) {
      const finalURL = APIUrls.partnerApps + user.partner_id + '/customer/' +
        user.customer_name + '/app';
      const reqObj = {
        customer_name: user.customer_name,
        partner_id: user.partner_id,
        app_id: appDetailsData.app_id,
        user_id: user.customer_name,
        user_role: null
      }

      this.postRequest(reqObj ? [reqObj] : '', finalURL)
        .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
          next: (response: any) => {
            if (response && response.status === 200) {
              this.accountService.goHome();
            }
          }
        });
    } else {
      this.spinner.show();
      let forKJoinArr = [];
      const finalURL = APIUrls.partnerApps + user.partner_id + '/app/' + appDetailsData.app_id;
      const createConfigUrl = APIUrls.partnerApps + user.partner_id + '/app/' + appDetailsData.app_id + '/config-definition';
      const response = this.postDataForkJoinWithToken('', finalURL);
      const responseA = this.postDataForkJoinWithToken('', createConfigUrl);
      forKJoinArr.push(response);
      if (appDetailsData.user_mgmt_enabled) {
        forKJoinArr.push(responseA);
      }
      forkJoin(forKJoinArr)
        .pipe(takeWhile(() => !this.destroySubscription)).subscribe((forkResponse: any) => {
          if (forkResponse && forkResponse.length) {
            this.spinner.hide();
            this.accountService.goHome();
          }
        }, (error) => {
          console.log('error at service', error);
          this.spinner.hide();
          const obj = {
            type: 'error',
            text: 'Something went wrong'
          }
          this.alertService.alertSubject.next(obj);
        });
    }
  }

  disableApp(isCustomerUser: boolean, appDetailsData: AppDataModel, user: PartnerDataModel) {
    if (isCustomerUser) {
      const finalURL = APIUrls.partnerApps + user.partner_id + '/customer/' + user.customer_name
        + '/app/' + appDetailsData.app_id;

      const reqObj = {
        'users': [user.customer_name]
      }
      this.deleteRequestA(reqObj, finalURL)
        .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
          next: (response: any) => {
            if (response && response.status === 200) {
              this.accountService.goHome();
            }
          }
        });
    } else {
      this.spinner.show();
      let forKJoinArr = [];
      const finalURL = APIUrls.partnerApps + user.partner_id + '/app/' + appDetailsData.app_id;
      const deleteConfigUrl = APIUrls.partnerApps + user.partner_id + '/app/' + appDetailsData.app_id + '/config-definition';
      const response = this.deleteRequestForkJoinWithToken(finalURL);
      const responseA = this.deleteRequestForkJoinWithToken(deleteConfigUrl)
      forKJoinArr.push(response);
      if (appDetailsData.user_mgmt_enabled) {
        forKJoinArr.push(responseA);
      }
      forkJoin(forKJoinArr)
        .pipe(takeWhile(() => !this.destroySubscription)).subscribe((forkResponse: any) => {
          if (forkResponse && forkResponse.length) {
            this.spinner.hide();
            this.accountService.goHome();
          }
        }, (error) => {
          console.log('error at service', error);
          this.spinner.hide();
          const obj = {
            type: 'error',
            text: 'Something went wrong'
          }
          this.alertService.alertSubject.next(obj);
        });
    }

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

  deleteRequestA(reqObj: any, deleteUrl: string) {
    return this.baseService.deleteRequestA(reqObj, deleteUrl);
  }

  postDataForkJoinWithToken(reqObj: any, reqUrl: string) {
    return this.baseService.postDataForkJoinWithToken(reqObj, reqUrl);
  }

  deleteRequestForkJoinWithToken(reqUrl: string) {
    return this.baseService.deleteRequestForkJoinWithToken(reqUrl);
  }

  deleteRequestForkJoinWithTokenA(reqObj: any, reqUrl: string) {
    return this.baseService.deleteRequestForkJoinWithTokenA(reqObj, reqUrl);
  }
}
