import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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

  constructor(private router: Router, private storeService: StoreService,
    private accountService: AccountService) {
    this.subscriptions();
    setTimeout(() => {
      const isAuthenticated = this.accountService.isAuthenticated();
      if (isAuthenticated) {
        this.preInit();
      } else {
        this.appInit();
      }  
    });
    
    this.accountService.isLoggedIn.pipe(takeWhile(() => !this.destroySubscription))
      .subscribe((response: any) => {
        if (response) {
          this.preInit();
        } else {
          this.isLoggedIn = false;
          this.appInit();
        }
      });
    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // console.log('event', event);
        if (event && event.url && event.url.indexOf('&state=') > -1) {
          this.accountService.authenticate(event.url);
        }
      });
    this.customOptions = {
      margin: 20,
      autoWidth: true,
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

  
  preInit() {
    this.isLoggedIn = true;
    this.user = this.accountService.getUser();
    this.appInit();
  }

  appInit() {
    this.storeService.getSpotlightApps();
    if (this.isLoggedIn && this.user) {
      this.storeService.getEnabledApps(this.user.partner_id);
      this.storeService.getAvailApps(this.user.partner_id);
    } else {
      this.storeService.getAllApps();
    }
  }

  subscriptions() {
    this.storeService.spotlightApps.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.spotlightApps = response;
      }
    });
    this.storeService.allApps.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.allApps = response;
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
    this.router.navigateByUrl('store/enabled');
  }

  goToAvailApps() {
    this.router.navigateByUrl('store/available');
  }

  goToCreatePartner() {
    this.router.navigateByUrl('account/createpartner');
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }

}
