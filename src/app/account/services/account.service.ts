import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeWhile } from 'rxjs';
import { APIUrls } from 'src/app/constants';
import { SharedService } from 'src/app/shared/shared.service';
import { CreatePartnerModel, PartnerDataModel } from '../models/accountModel';
import { BaseService } from 'src/app/base.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
const USER_KEY = 'user-details-auth';

@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnDestroy {

  destroySubscription = false;

  partnerDataModel: PartnerDataModel;

  isLoggedIn = new Subject();

  constructor(private sharedService: SharedService, private baseService: BaseService,
    private http: HttpClient, private router: Router) {
    this.partnerDataModel = {} as PartnerDataModel;
  }

  public saveUser(user: any): void {
    this.removeUser()
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));

  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user && user !== 'undefined') {
      return JSON.parse(user);
    }
    return null;
  }

  public removeUser() {
    window.sessionStorage.removeItem(USER_KEY);
  }

  isAuthenticated() {
    const user = this.getUser();
    if (user) {
      return true;
    }
    return false;
  }

  login(shortname: string) {
    this.baseService.getDataText(APIUrls.loginPartner + shortname)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            // console.log('at login', response.body);
          }
        }
      });
  }

  registerPartner(createPartnerModel: CreatePartnerModel) {
    this.sharedService.postRequest(createPartnerModel, APIUrls.createPartner)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            // console.log('at register', response.body);
            this.authenticatePartner(response.body.partner_id);
          }
        }
      });
  }

  authenticatePartner(partner_id: any) {
    this.baseService.getDataText(APIUrls.authenticatePartner + partner_id)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            // console.log('at login main authorise partner', response.body);
          }
        }
      });
  }

  goHome() {
    const user = this.getUser();
    if(user) {
      const link = [`${user.short_name}/store/`];
      this.router.navigate(link);
    } else {
      this.router.navigateByUrl('dashboard/main');
    }
  }

  goAppDetails(app_id: any) {
    const user = this.getUser();
    if(user) {
      const link = [`${user.short_name}/app/${app_id}`];
      this.router.navigate(link);
    }
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }
}
