import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeWhile } from 'rxjs';
import { PartnerDataModel } from 'src/app/account/models/accountModel';
import { AccountService } from 'src/app/account/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() isLoggedIn: boolean = false;

  user: PartnerDataModel;

  isCustomerUser = false;

  isLoginScreen = false;

  routerSubscription: any;

  destroySubscription = false;

  constructor(private renderer: Renderer2, private router: Router, private accountServie: AccountService) {
    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // console.log('event', event);
        if (event && (event.url.indexOf('dashboard/login') > -1)) {
          this.isLoginScreen = true;
        } else if (event && (event.url.indexOf('dashboard/login') === -1)) {
          this.isLoginScreen = false;
        }
      });

    this.user = this.accountServie.getUser() ? this.accountServie.getUser() : null;
    if (this.user && this.user.customer_name) {
      this.isCustomerUser = true;
    }
    this.accountServie.user.pipe(takeWhile(() => !this.destroySubscription))
      .subscribe((response: any) => {
        if (response) {
          this.user = response;
          if (this.user && this.user.customer_name) {
            this.isCustomerUser = true;
          }
        }
      });
  }

  ngOnInit(): void {
  }

  toggleMenu() {
    const elSidebar: any = document.getElementById('sidebar');
    const elMain: any = document.getElementById('main');
    const action = elSidebar.classList.contains('active') ? 'removeClass' : 'addClass';
    this.renderer[action](elSidebar, 'active');
    this.renderer[action](elMain, 'isSidebar');
  }

  goToHome() {
    this.accountServie.goHome();
  }

  logout() {
    this.accountServie.removeUser();
    location.reload();
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.destroySubscription = true;
  }
}
