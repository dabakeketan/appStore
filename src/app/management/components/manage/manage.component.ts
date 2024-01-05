import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManagementService } from '../../services/management.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeWhile } from 'rxjs';
import { MNGUrls } from 'src/app/constants';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {

  destroySubscription = false;

  routerSubscription: any;

  constructor(private managementService: ManagementService, private router: Router) {
    this.subscriptions();
    const mngToken = this.managementService.getMngToken();
    if (mngToken) {
      
      this.router.navigate(['/manage/partner']);
      // const route = user.short_name + '/store/home/';
      // const link = [`${user.short_name}/store/`];
      // this.router.navigate(link);
    }
    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        console.log('event', event);
        if (event && event.url && event.url.indexOf('?code=') > -1) {
          const authCode = event.url.substring(event.url.indexOf('=') + 1);
          // console.log('abc', authCode);
          this.authLoginB(authCode);
        } else if (event && ((event.url.indexOf('/manage/oauth/login') > -1)
          || (event.url.indexOf('/manage') > -1))) {
          this.authLoginA();
        }
      });
  }

  ngOnInit(): void {

  }

  authLoginA() {
    // window.location.href = MNGUrls.mngAppAuthUrl;

    // window.location.href = JSON.parse(JSON.stringify(MNGUrls.mngAppAuthUrl));

    this.managementService.getRequest(MNGUrls.mngAppAuthUrl + '?redirect_uri=' + window.location.href)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => { }
      });
  }

  authLoginB(authCode: any) {
    const url = MNGUrls.mngAppAuthToken + '?code=' + authCode;
    this.managementService.getRequest(url)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          console.log('respoonse', response);
          this.managementService.saveMngToken(response.body);
          this.managementService.isMngLoggedIn.next(true);

          this.router.navigate(['/manage/partner']);
        },
        error: (err: any) => {
          // alert('Login Failed');
        }
      });
  }

  subscriptions() {
    // this.storeService.spotlightApps.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
    //   next: (response: any) => {
    //     this.spotlightApps = response;
    //   }
    // });
    // this.storeService.allApps.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
    //   next: (response: any) => {
    //     this.allApps = response;
    //   }
    // });

  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
    this.routerSubscription.unsubscribe();
  }

}
