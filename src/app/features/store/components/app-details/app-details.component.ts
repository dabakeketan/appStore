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

  constructor(private router: Router, private route: ActivatedRoute, private storeService: StoreService,
    private accountService: AccountService) {
    this.app_Id = String(this.route.snapshot.paramMap.get('id'));
    this.user = this.accountService.getUser();
  }

  ngOnInit(): void {
    this.appInit();
  }

  appInit() {
    const response = this.storeService.getRequest(APIUrls.appDetails + this.app_Id);
    const responseA = this.storeService.getRequest(APIUrls.partnerApps + this.user.partner_id + '/app/'
      + this.app_Id + '/check-enabled');
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
    this.storeService.disableApp(this.user.partner_id, this.app_Id);
  }

  enableApp() {
    this.storeService.enableApp(this.user.partner_id, this.app_Id);
  }

  goBack() {
    this.storeService.goHome()
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }
}
