import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeWhile } from 'rxjs';
import { AlertService } from 'src/app/alert/services/alert.service';
import { BaseService } from 'src/app/base.service';
import { AlertTypes, MNGUrls, successMsgs } from 'src/app/constants';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CreateAppDataModel, CreateVendorDataModel, PartnerListDataModel } from '../models/managementModel';
const MNG_USER_KEY = 'mng-user-details-auth';
const MNG_TOKEN_KEY = 'mng-app-token';

declare let bootstrap: any;


@Injectable({
  providedIn: 'root'
})
export class ManagementService implements OnDestroy {

  isMngLoggedIn = new Subject();

  destroySubscription = false;

  inviteCodePopupSubject = new Subject();

  partnersListDataSub = new Subject();

  singlePartnerDataSub = new Subject();

  updatePartnerDataSub = new Subject();

  vendorsListDataSub = new Subject();

  createVendorDataSub = new Subject();

  singleVendorDataSub = new Subject();

  vendorAppsListDataSub = new Subject();

  createVendorAppDataSub = new Subject();

  singleVendorAppDataSub = new Subject();




  constructor(private baseService: BaseService, private alertService: AlertService,
    private router: Router) { }

  mngAuthLogin() {
    window.location.href = JSON.parse(JSON.stringify(MNGUrls.mngAppAuthUrl));
  }

  public saveMngUser(user: any): void {
    this.removeMngUser()
    window.sessionStorage.setItem(MNG_USER_KEY, JSON.stringify(user));

  }

  public getMngUser(): any {
    const user = window.sessionStorage.getItem(MNG_USER_KEY);
    if (user && user !== 'undefined') {
      return JSON.parse(user);
    }
    return null;
  }

  public removeMngUser() {
    window.sessionStorage.removeItem(MNG_USER_KEY);
  }

  public saveMngToken(tokenObj: any): void {
    this.removeMngUser()
    window.sessionStorage.setItem(MNG_TOKEN_KEY, JSON.stringify(tokenObj));

  }

  public getMngToken(): any {
    const user = window.sessionStorage.getItem(MNG_TOKEN_KEY);
    if (user && user !== 'undefined') {
      return JSON.parse(user);
    }
    return null;
  }

  public removeMngToken() {
    window.sessionStorage.removeItem(MNG_TOKEN_KEY);
  }

  getPartnersList() {
    this.getRequest(MNGUrls.getPartnersList)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            this.partnersListDataSub.next(response.body);
          }
        },
        error: (err: any) => {
          this.partnersListDataSub.next(null);
        }
      });
  }

  getPartner(partner_id: string) {
    this.getRequest(MNGUrls.partnerBase + partner_id)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            this.singlePartnerDataSub.next(response.body);
          }
        },
        error: (err: any) => {
          this.singlePartnerDataSub.next(null);
        }
      });
  }

  updatePartner(updatePartnerDataModel: any) {
    console.log(updatePartnerDataModel);
    Object.keys(updatePartnerDataModel).forEach(key => {
      if (updatePartnerDataModel[key] === '') {
        delete updatePartnerDataModel[key];
      }
    });
    console.log(updatePartnerDataModel);

    this.putRequest(updatePartnerDataModel, MNGUrls.partnerBaseA)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            const obj = {
              type: AlertTypes.success,
              text: 'scuccess'
            }
            this.alertService.alertSubject.next(obj);

            this.updatePartnerDataSub.next(obj);
          }
        }
      });
  }

  deletePartners(selectedPartnersData: any) {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2dce89",
      cancelButtonColor: "#f5365c",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {

        this.deleteRequest(MNGUrls.partnerBase + selectedPartnersData.partner_id)
          .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
            next: (response: any) => {
              if (response && response.status === 200) {
                Swal.fire({
                  title: "Deleted!",
                  icon: "success",
                  timer: 1000
                });
                this.getPartnersList();
              }
            },
            error: (err: any) => {

            }
          });
      }
    });

  }

  createPartner(inviteEmailAddr: string) {
    const reqObj = {
      email: inviteEmailAddr
    }
    this.postRequest(reqObj, MNGUrls.createPartnerInvite)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            const obj = {
              type: AlertTypes.success,
              text: successMsgs.codeSentTo + ' ' + inviteEmailAddr
            }
            this.alertService.alertSubject.next(obj);

            this.inviteCodePopupSubject.next(obj);
          }
        }
      });
  }

  createVendor(createVendorDataModel: CreateVendorDataModel, isUpdateVendor: boolean) {
    if (isUpdateVendor) {
      this.putRequest(createVendorDataModel, MNGUrls.vendorBase)
        .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
          next: (response: any) => {
            if (response && response.status === 200) {
              const obj = {
                type: AlertTypes.success,
                text: 'Success'
              }
              this.getVendorsList();
              this.alertService.alertSubject.next(obj);
              this.createVendorDataSub.next(true);
            }
          }
        });
    } else {
      this.postRequest(createVendorDataModel, MNGUrls.vendorBase)
        .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
          next: (response: any) => {
            if (response && response.status === 200) {
              const obj = {
                type: AlertTypes.success,
                text: 'Success'
              }
              this.getVendorsList();
              this.alertService.alertSubject.next(obj);
              this.createVendorDataSub.next(true);
            }
          }
        });
    }
  }

  getVendorsList() {
    this.getRequest(MNGUrls.getVendorsList)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            this.vendorsListDataSub.next(response.body);
          }
        },
        error: (err: any) => {
          this.vendorsListDataSub.next(null);
        }
      });
  }

  getVendor(vendor_name: string) {
    const url = MNGUrls.vendorBase + '?vendor-name=' + vendor_name;
    this.getRequest(url)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            this.singleVendorDataSub.next(response.body);
          }
        },
        error: (err: any) => {
          this.singleVendorDataSub.next(null);
        }
      });
  }

  deleteVendor(selectedVendorsData: any) {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2dce89",
      cancelButtonColor: "#f5365c",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {

        this.deleteRequest(MNGUrls.vendorBase + '/' + selectedVendorsData.vendor_id)
          .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
            next: (response: any) => {
              if (response && response.status === 200) {
                Swal.fire({
                  title: "Deleted!",
                  icon: "success",
                  timer: 1000
                });
                this.getVendorsList();
              }
            },
            error: (err: any) => {

            }
          });
      }
    });
  }

  getVendorAppsList() {
    this.getRequest(MNGUrls.vendorAppBase + '/apps')
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            this.vendorAppsListDataSub.next(response.body);
          }
        },
        error: (err: any) => {
          this.vendorAppsListDataSub.next(null);
        }
      });
  }

  getVendorAppDetails(app_id: string) {
    this.getRequest(MNGUrls.vendorAppBase + '/' + app_id)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            this.singleVendorAppDataSub.next(response.body);
          }
        },
        error: (err: any) => {
          this.singleVendorAppDataSub.next(null);
        }
      });
  }

  createVendorApp(createAppDataModel: CreateAppDataModel, isCreateApp: boolean) {
    if (isCreateApp) {
      this.postRequest(createAppDataModel, MNGUrls.vendorAppBase)
        .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
          next: (response: any) => {
            if (response && response.status === 200) {
              this.createVendorAppPosAction();
            }
          }
        });
    } else {
      this.putRequest(createAppDataModel, MNGUrls.vendorAppBase)
        .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
          next: (response: any) => {
            if (response && response.status === 200) {
              this.createVendorAppPosAction();
            }
          }
        });
    }
  }

  createVendorAppPosAction() {
    const obj = {
      type: AlertTypes.success,
      text: 'Success'
    }
    this.getVendorAppsList();
    this.alertService.alertSubject.next(obj);
    this.createVendorAppDataSub.next(true);
  }

  deleteVendorApp(selectedVendorAppsData: any) {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2dce89",
      cancelButtonColor: "#f5365c",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {

        this.deleteRequest(MNGUrls.vendorAppBase + '/' + selectedVendorAppsData.app_id)
          .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
            next: (response: any) => {
              if (response && response.status === 200) {
                Swal.fire({
                  title: "Deleted!",
                  icon: "success",
                  timer: 1000
                });
                this.getVendorAppsList();
              }
            },
            error: (err: any) => {

            }
          });
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

  deleteRequest(deleteUrl: string, urlParams?: any, id?: any) {
    let urlData = '';
    if (urlParams && urlParams.length) {
      urlParams.forEach((val: any) => {
        urlData += '&' + val.paramLabel + '=' + val.paramValue
      });
    }
    return this.baseService.deleteRequest(deleteUrl + (urlData ? urlData : ''));
  }

  putRequest(reqObj: any, reqUrl: string, urlParams?: any) {
    let urlData = '';
    if (urlParams && urlParams.length) {
      urlParams.forEach((val: any) => {
        urlData += '&' + val.paramLabel + '=' + val.paramValue
      });
    }
    return this.baseService.putData(reqObj, reqUrl + (urlData ? urlData : ''));
  }

  goHome() {
    this.router.navigate(['/manage']);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }
}
