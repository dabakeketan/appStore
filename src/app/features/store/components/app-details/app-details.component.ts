import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIUrls, categoriesArr, headerTexts } from 'src/app/constants';
import { StoreService } from '../../services/store.service';
import { forkJoin, takeWhile } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { AppDataModel } from '../../models/storeModel';
import { PartnerDataModel } from 'src/app/account/models/accountModel';
import { AccountService } from 'src/app/account/services/account.service';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.scss']
})
export class AppDetailsComponent implements OnInit, OnDestroy {

  headerTexts = headerTexts;

  categoriesArr = categoriesArr;

  destroySubscription = false;

  app_Id: any;

  appDetailsData: AppDataModel;

  isAppEnabled = false;

  user: PartnerDataModel;

  isCustomerUser = false;

  constructor(private router: Router, private route: ActivatedRoute, private storeService: StoreService,
    private accountService: AccountService) {
    this.app_Id = String(this.route.snapshot.paramMap.get('id'));
    this.user = this.accountService.getUser();
    if (this.user) {
      if (this.user.customer_name) {
        this.isCustomerUser = true;
      } else {
        this.isCustomerUser = false;
      }
    }
  }

  ngOnInit(): void {
    this.appInit();
  }

  appInit() {
    const response = this.storeService.getRequest(APIUrls.appDetails + this.app_Id);
    let checkEnableUrl = APIUrls.partnerApps + this.user.partner_id;
    if(this.isCustomerUser) {
      checkEnableUrl = checkEnableUrl + '/customer/' + this.user.customer_name +
      '/app/' + this.app_Id + '/check-enabled';
    } else {
      checkEnableUrl = checkEnableUrl + '/app/' + this.app_Id + '/check-enabled'
    }
    const responseA = this.storeService.getRequest(checkEnableUrl);
    forkJoin([response, responseA])
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe((forkResponse: any) => {
        if (forkResponse && forkResponse.length) {
          if (forkResponse[0] && forkResponse[0].status === 200 && forkResponse[0].body) {
            this.appDetailsData = forkResponse[0].body
          }
          if (forkResponse[1] && forkResponse[1].status === 200 && forkResponse[1].body) {
            console.log(forkResponse[1].body);
            const res = forkResponse[1].body;
            if (res && res.message && res.message === 'False') {
              this.isAppEnabled = false;
            } else if(res && res.message && res.message === 'True') {
              this.isAppEnabled = true;
            }

          }
        }
      });
  }

  disableApp() {
    this.storeService.disableApp(this.isCustomerUser, this.app_Id, this.user);
  }

  enableApp() {
    this.storeService.enableApp(this.isCustomerUser, this.app_Id, this.user);
  }

  goBack() {
    this.accountService.goHome();
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }
}
