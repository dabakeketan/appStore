import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { takeWhile, filter } from 'rxjs';
import { headerTexts, categoriesArr, productsArr, APIUrls } from 'src/app/constants';
import { AppDataModel } from 'src/app/features/store/models/storeModel';
import { StoreService } from 'src/app/features/store/services/store.service';
import { PartnerDataModel } from '../../models/accountModel';
import { AccountService } from '../../services/account.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-store-default',
  templateUrl: './store-default.component.html',
  styleUrls: ['./store-default.component.scss']
})
export class StoreDefaultComponent implements OnInit, OnDestroy {

  isLoggedIn = false;

  user: PartnerDataModel;

  spotlightApps: Array<AppDataModel> = [];

  allApps: Array<AppDataModel> = [];

  carouselDataAvailable: any = [];

  carouselDataEnable: any = [];

  customOptions: OwlOptions = {};

  headerTexts = headerTexts;

  categoriesArr = categoriesArr;

  productsArr = productsArr;

  destroySubscription = false;

  routerSubscription: any;

  constructor(private router: Router, private storeService: StoreService,
    private accountService: AccountService, private http: HttpClient) {
    this.subscriptions();
    // const isAuthenticated = this.accountService.isAuthenticated();
    const user = this.accountService.getUser();
    if (user) {
      // const route = user.short_name + '/store/home/';
      this.user = user;
      const link = [`${user.short_name}/store/`];
      this.router.navigate(link);
    }
    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // console.log('event', event);
        if (event && event.url && event.url.indexOf('&state=') > -1) {
          const subUrl = event.url.substring(event.url.indexOf('/') + 1);
          let finalUrl = '';
          finalUrl = APIUrls.authorisation + subUrl;
          this.storeService.getRequest(finalUrl)
            .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
              next: (response: any) => {
                if (response && response.status === 200) {
                  console.log('at login res', response.body);
                  this.user = response.body;
                  this.accountService.saveUser(this.user);
                  this.accountService.isLoggedIn.next(true);
                  const link = [`${response.body.short_name}/store/`];
                  this.router.navigate(link);
                }
              }
            });
          // let promise = new Promise<boolean>((resolve, reject) => {
          //   const that = this;
          //   this.http.get(finalUrl)
          //     .toPromise()
          //     .then(
          //       (res: any) => { // Success
          //         console.log('at login res', res);
          //         this.user = res;
          //         this.accountService.saveUser(this.user);
          //         this.accountService.isLoggedIn.next(true);
          //         const link = [`${res.short_name}/store/`];
          //         that.router.navigate(link);
          //         // this.router.navigateByUrl(res.short_name + '/store/');
          //         resolve(true);
          //       }
          //     );
          // });
          // promise.then(() => {
          //   console.log('at login promise');
          // });
        } else {
          if (!this.user) {
            console.log('login main counitng');
            this.appInit();
          }
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

  appInit() {
    this.storeService.getSpotlightApps();
    this.storeService.getAllApps();
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

  }

  goToCreatePartner() {
    this.router.navigateByUrl('dashboard/createpartner');
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
    this.routerSubscription.unsubscribe();
  }

}
