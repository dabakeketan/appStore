import { Injectable } from '@angular/core';
import { takeWhile } from 'rxjs';
import { APIUrls } from 'src/app/constants';
import { SharedService } from 'src/app/shared/shared.service';
import { CreatePartnerModel } from '../models/accountModel';
import { BaseService } from 'src/app/base.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  destroySubscription = false;

  constructor(private sharedService: SharedService, private baseService: BaseService) { }

  login(shortname: string) {
    // fetch(APIUrls.logoutPartner + shortname)
    //   .then(console.log);
    this.baseService.getDataText(APIUrls.logoutPartner + shortname)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            console.log('at login', response.body);
          }
        }
      });
  }

  registerPartner(createPartnerModel: CreatePartnerModel) { 
    this.sharedService.postRequest(createPartnerModel, APIUrls.createPartner)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            console.log('at register', response.body);
            this.authorisePartner(response.body.partner_id);
          }
        }
      });
  }

  authorisePartner(partner_id: any) {
    this.baseService.getDataText(APIUrls.authorisePartner + partner_id)
    .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        if (response && response.status === 200) {
          console.log('at authorise', response.body);
        }
      }
    });
  }

  goHome() {
    this.sharedService.goHome();
  }
}
