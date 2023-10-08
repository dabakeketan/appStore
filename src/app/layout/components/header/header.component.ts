import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { PartnerDataModel } from 'src/app/account/models/accountModel';
import { AccountService } from 'src/app/account/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() isLoggedIn: boolean = false;

  @Input() user: PartnerDataModel;

  isLoginScreen = false;

  routerSubscription: any;

  constructor(private renderer: Renderer2, private router: Router, private accountServie: AccountService) {
    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // console.log('event', event);
        if (event && (event.url.indexOf('dashboard/login') > -1)) {
          this.isLoginScreen = true;
        } else if(event && (event.url.indexOf('dashboard/login') === -1)) {
          this.isLoginScreen = false;
        }
      });
  }

  ngOnInit(): void {
    // console.log('isLoggedIn', this.isLoggedIn);
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
  }
}
