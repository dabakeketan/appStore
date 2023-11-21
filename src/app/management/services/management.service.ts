import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base.service';
import { MNGUrls } from 'src/app/constants';
const MNG_USER_KEY = 'mng-user-details-auth';
const MNG_TOKEN_KEY = 'mng-app-token';


@Injectable({
  providedIn: 'root'
})
export class ManagementService {

  constructor(private baseService: BaseService) { }

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

  getRequest(reqUrl: string, urlParams?: any) {
    let urlData = '';
    if (urlParams && urlParams.length) {
      urlParams.forEach((val: any) => {
        urlData += '&' + val.paramLabel + '=' + val.paramValue
      });
    }
    return this.baseService.getData(reqUrl + (urlData ? urlData : ''));
  }
}
