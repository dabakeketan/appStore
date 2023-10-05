import { Injectable } from '@angular/core';
import { Subject, takeWhile } from 'rxjs';
import { BaseService } from 'src/app/base.service';
import { APIUrls } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  spotlightApps = new Subject();

  allApps = new Subject();

  appDetailsSubject = new Subject();

  destroySubscription = false;

  imagePath:any;

  constructor(private baseService: BaseService) { }

  getSpotlightApps() {
    this.getRequest(APIUrls.spotLightApps)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            console.log('spotlight apps', response.body);
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
          console.log('all apps', response.body);
          this.allApps.next(response.body);
        }
      }
    });
  }

  getAppDetails() {
    this.getRequest(APIUrls.appDetails + 'Hka2LSxWj5RJQUE6Up6h3R')
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
