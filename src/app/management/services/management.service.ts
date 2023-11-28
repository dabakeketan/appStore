import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeWhile } from 'rxjs';
import { AlertService } from 'src/app/alert/services/alert.service';
import { BaseService } from 'src/app/base.service';
import { AlertTypes, MNGUrls, successMsgs } from 'src/app/constants';
import Swal from 'sweetalert2/dist/sweetalert2.js';
const MNG_USER_KEY = 'mng-user-details-auth';
const MNG_TOKEN_KEY = 'mng-app-token';


@Injectable({
  providedIn: 'root'
})
export class ManagementService implements OnDestroy {

  destroySubscription = false;

  inviteCodePopupSubject = new Subject();

  partnersListDataSub = new Subject();

  vendorsListDataSub = new Subject();

  vendorAppsListDataSub = new Subject();

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

  getVendorAppsList() {
    this.getRequest(MNGUrls.getVendorAppsList)
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

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }
}
