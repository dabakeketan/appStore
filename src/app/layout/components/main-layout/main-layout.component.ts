import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { PartnerDataModel } from 'src/app/account/models/accountModel';
import { AccountService } from 'src/app/account/services/account.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  isLoggedIn = false;

  user: PartnerDataModel;

  destroySubscription = false;

  constructor(private accountService: AccountService) { }

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
