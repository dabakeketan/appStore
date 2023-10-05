import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() isLoggedIn: boolean = false;

  isLoginScreen = false;

  routerSubscription: any;

  constructor(private renderer: Renderer2, private router: Router) {
    this.routerSubscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        console.log('event', event);
        if (event && (event.url.indexOf('account/login') > -1)) {
          this.isLoginScreen = true;
        } else if(event && (event.url.indexOf('account/login') === -1)) {
          this.isLoginScreen = false;
        }
      });
  }

  ngOnInit(): void {
    console.log('isLoggedIn', this.isLoggedIn);
  }

  toggleMenu() {
    const elSidebar: any = document.getElementById('sidebar');
    const elMain: any = document.getElementById('main');
    const action = elSidebar.classList.contains('active') ? 'removeClass' : 'addClass';
    this.renderer[action](elSidebar, 'active');
    this.renderer[action](elMain, 'isSidebar');
  }

  goToHome() {
    this.router.navigateByUrl('store/home');
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
