import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ManagementService } from 'src/app/management/services/management.service';

@Component({
  selector: 'app-header-mng',
  templateUrl: './header-mng.component.html',
  styleUrls: ['./header-mng.component.scss']
})
export class HeaderMngComponent implements OnInit, OnDestroy {

  @Input() isMngLoggedIn: boolean = false;

  destroySubscription = false;

  constructor(private managementService: ManagementService) {
    
  }

  ngOnInit(): void {
  }

  goToHome() {
    this.managementService.goHome();
  }

  logout() {
    // this.managementService.removeMngToken();
    // location.reload();
    this.managementService.logout();
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }

}
