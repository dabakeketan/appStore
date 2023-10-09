import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { headerTexts, categoriesArr, productsArr } from 'src/app/constants';
import { StoreService } from '../../services/store.service';
import { AppDataModel } from '../../models/storeModel';
import { AccountService } from 'src/app/account/services/account.service';
import { PartnerDataModel } from 'src/app/account/models/accountModel';

@Component({
  selector: 'app-available-apps',
  templateUrl: './available-apps.component.html',
  styleUrls: ['./available-apps.component.scss']
})
export class AvailableAppsComponent implements OnInit, OnDestroy {

  headerTexts = headerTexts;

  categoriesArr = categoriesArr;
  
  productsArr = productsArr;

  availApps: Array<AppDataModel>;

  destroySubscription = false;

  user: PartnerDataModel;

  isCustomerUser = false;

  constructor(private router: Router, private storeService: StoreService,
    private accountService: AccountService) {
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
    this.storeService.availApps.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.availApps = response;
      }
    });
    this.storeService.getAvailApps(this.isCustomerUser, this.user.partner_id, this.user.customer_name);
  }

  gotoDetails(app_id: any) {
    this.accountService.goAppDetails(app_id);
  }

  goBack() {
    this.accountService.goHome();
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }

}