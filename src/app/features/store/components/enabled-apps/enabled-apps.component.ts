import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { headerTexts, categoriesArr, productsArr } from 'src/app/constants';
import { StoreService } from '../../services/store.service';
import { AppDataModel } from '../../models/storeModel';
import { takeWhile } from 'rxjs';
import { PartnerDataModel } from 'src/app/account/models/accountModel';
import { AccountService } from 'src/app/account/services/account.service';

@Component({
  selector: 'app-enabled-apps',
  templateUrl: './enabled-apps.component.html',
  styleUrls: ['./enabled-apps.component.scss']
})
export class EnabledAppsComponent implements OnInit, OnDestroy {

  headerTexts = headerTexts;

  categoriesArr = categoriesArr;

  productsArr = productsArr;

  enabledApps: Array<AppDataModel>;

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
    this.storeService.enabledApps.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.enabledApps = response;
      }
    });
    this.storeService.getEnabledApps(this.isCustomerUser, this.user.partner_id, this.user.customer_name);
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
