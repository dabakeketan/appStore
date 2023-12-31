import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { categoriesArr, headerTexts, productsArr } from 'src/app/constants';
import { StoreService } from '../../services/store.service';
import { filter, takeWhile } from 'rxjs';
import { AppDataModel } from '../../models/storeModel';
import { AccountService } from 'src/app/account/services/account.service';
import { PartnerDataModel } from 'src/app/account/models/accountModel';

@Component({
  selector: 'app-store-main',
  templateUrl: './store-main.component.html',
  styleUrls: ['./store-main.component.scss']
})
export class StoreMainComponent implements OnInit, OnDestroy {

  isLoggedIn = false;

  user: PartnerDataModel;

  spotlightApps: Array<AppDataModel> = [];

  allApps: Array<AppDataModel> = [];

  enabledApps: Array<AppDataModel> = [];

  availApps: Array<AppDataModel> = [];

  carouselDataAvailable: any = [];

  carouselDataEnable: any = [];

  customOptions: OwlOptions = {};

  headerTexts = headerTexts;

  categoriesArr = categoriesArr;

  productsArr = productsArr;

  destroySubscription = false;

  routerSubscription: any;

  isCustomerUser = false;

  constructor(private router: Router, private storeService: StoreService,
    private accountService: AccountService) {
    this.subscriptions();
    this.user = this.accountService.getUser();
    if (this.user) {
      if (this.user.customer_name) {
        this.isCustomerUser = true;
      } else {
        this.isCustomerUser = false;
      }
      console.log('login main direct partner call check true');
      this.isLoggedIn = true;
      this.appInit();
    }


    this.customOptions = {
      margin: 20,
      // autoWidth: true,
      autoplay: true,
      rewind: true,
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 6
        }
      },
      nav: false
    }
  }

  ngOnInit(): void {
  }

  appInit() {
    this.storeService.getSpotlightApps();
    this.storeService.getEnabledApps(this.isCustomerUser, this.user.partner_id, this.user.customer_name);
    this.storeService.getAvailApps(this.isCustomerUser, this.user.partner_id, this.user.customer_name);
  }

  subscriptions() {
    this.storeService.spotlightApps.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.spotlightApps = response;
      }
    });

    this.storeService.enabledApps.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.enabledApps = response;
      }
    });

    this.storeService.availApps.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.availApps = response;
      }
    });
  }

  goToEnabledApps() {
    const link = [`${this.user.short_name}/enabled`];
    this.router.navigate(link);
  }

  goToAvailApps() {
    const link = [`${this.user.short_name}/available`];
    this.router.navigate(link);
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }

}
