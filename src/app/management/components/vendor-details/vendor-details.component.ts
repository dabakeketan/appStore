import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManagementService } from '../../services/management.service';
import { takeWhile } from 'rxjs';
import { AppListDataModel } from '../../models/managementModel';

declare let bootstrap: any;

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit, OnDestroy {

  createAppPopup: any;

  appsListData: AppListDataModel[];

  selectedVendorAppsData = [];

  destroySubscription = false;

  constructor(private managementService: ManagementService) { }

  ngOnInit(): void {
    this.subscribtions();
    this.managementService.getVendorAppsList();
  }

  
  subscribtions() {
    this.managementService.vendorAppsListDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.appsListData = response;
      }
    });
  }

  receiveAppsData(event: any) {
    this.selectedVendorAppsData = event;
  }

  receiveAppsEditedData(event: any) {

  }

  openCreateAppPopup() {
    this.createAppPopup = new bootstrap.Modal(document.getElementById("createAppModal"), {});
    this.createAppPopup.show();
  }

  deleteApps() {

  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }

}
