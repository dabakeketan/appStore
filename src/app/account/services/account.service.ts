import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeWhile } from 'rxjs';
import { APIUrls } from 'src/app/constants';
import { SharedService } from 'src/app/shared/shared.service';
import { CreatePartnerModel, PartnerDataModel } from '../models/accountModel';
import { BaseService } from 'src/app/base.service';
const USER_KEY = 'user-details-auth';

@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnDestroy {

  destroySubscription = false;

  partnerDataModel: PartnerDataModel;

  isLoggedIn = new Subject();

  constructor(private sharedService: SharedService, private baseService: BaseService) {
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

  authenticate(url: string) {
    // const userIdA = url.substring(url.indexOf('&state=') + 1);
    // const userId = userIdA.substring(userIdA.indexOf('=') + 1);
    const subUrl = url.substring(url.indexOf('/') + 1);
    // console.log('userid', userId);
    // console.log('userid', subUrl);
    let finalUrl = '';
    finalUrl = APIUrls.authorisePartnerURL + subUrl;
    this.baseService.getData(finalUrl)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            console.log('at login main', response.body);
            this.partnerDataModel = response.body;
            this.saveUser(this.partnerDataModel);
            this.isLoggedIn.next(true);
          }
        }
      });
  }

  login(shortname: string) {
    // fetch(APIUrls.logoutPartner + shortname)
    //   .then(console.log);
    this.baseService.getDataText(APIUrls.logoutPartner + shortname)
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
            this.authorisePartner(response.body.partner_id);
          }
        }
      });
  }

  authorisePartner(partner_id: any) {
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
    this.sharedService.goHome();
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }
}
