import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeWhile } from 'rxjs';
import { PartnerDataModel } from 'src/app/account/models/accountModel';
import { AccountService } from 'src/app/account/services/account.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  isLoggedIn = false;

  isNavBarVisible = false;

  user: PartnerDataModel;

  destroySubscription = false;

  routerSubscription: any;

  constructor(private accountService: AccountService, private router: Router) { 
    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      // console.log('event', event);
      if (event && ((event.url.indexOf('manage/main') > -1)
      || (event.url.indexOf('manage/partner') > -1)
    || (event.url.indexOf('manage/app') > -1)
    )) {
        this.isNavBarVisible = true;
      } else {
        this.isNavBarVisible = false;
      }
    });
  }

  ngOnInit(): void {
    const isAuthenticated = this.accountService.isAuthenticated();
    if (isAuthenticated) {
     this.preInit();
    }
    this.accountService.isLoggedIn.pipe(takeWhile(() => !this.destroySubscription))
      .subscribe((response: any) => {
        if (response) {
          this.preInit();
        } else {
          this.isLoggedIn = false;
        }
      });
  }

  
  preInit() {
    this.isLoggedIn = true;
    this.user = this.accountService.getUser() ? this.accountService.getUser() : null;
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }

}
