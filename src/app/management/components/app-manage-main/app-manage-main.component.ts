import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManagementService } from '../../services/management.service';
import { takeWhile } from 'rxjs';
import { VendorsListDataModel } from '../../models/managementModel';

@Component({
  selector: 'app-app-manage-main',
  templateUrl: './app-manage-main.component.html',
  styleUrls: ['./app-manage-main.component.scss']
})
export class AppManageMainComponent implements OnInit, OnDestroy {

  vendorsListData: VendorsListDataModel[];

  destroySubscription = false;

  constructor(private managementService: ManagementService) { }

  ngOnInit(): void {
    this.subscribtions();
    this.managementService.getVendorsList();
  }

  subscribtions() {
    this.managementService.vendorsListDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.vendorsListData = response;
      }
    });
  }

  receiveVendorsData(event: any) {
    console.log('abcd', event);
  }

  receiveVendorsEditedData(event: any) {
    console.log('abcd d', event);
    this.managementService.navigateTo('/dashboard/main');
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }

}
