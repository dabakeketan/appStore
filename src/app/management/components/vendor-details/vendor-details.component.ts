import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManagementService } from '../../services/management.service';
import { takeWhile } from 'rxjs';
import { AppListDataModel, CreateAppDataModel } from '../../models/managementModel';
import { NgForm } from '@angular/forms';

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

  createAppForm: NgForm;

  isCreateApp = true;

  createAppDataModel: CreateAppDataModel

  constructor(private managementService: ManagementService) { }

  ngOnInit(): void {
    this.subscribtions();
    this.managementService.getVendorAppsList();
    this.initializeCreateAppData();
  }

  initializeCreateAppData() {
    this.createAppDataModel = {
      app_icon: '',
      app_icon_url: '',
      app_image: '',
      app_image_url: '',
      app_name: '',
      app_secret: '',
      description: '',
      vendor_app_fqdn: '',
      type: '',
      authType: '',
      geospec: '',
      userTiers: false,
      userManagament: false,
      tiersArr: [
        {
          name: 'Tier 1'
        },
        {
          name: 'Tier 2'
        },
        {
          name: ''
        },
        {
          name: ''
        },
        {
          name: ''
        },
      ],
    };
  }


  subscribtions() {
    this.managementService.vendorAppsListDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.appsListData = response;
      }
    });

    this.managementService.singleVendorAppDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.createAppDataModel = {
          app_icon: '',
          app_icon_url: response.app_icon_url ? response.app_icon_url : '' ,
          app_image: '',
          app_image_url: response.app_image_url ? response.app_image_url : '',
          app_name: response.app_name ? response.app_name : '',
          app_secret: response.app_secret ? response.app_secret : '',
          description: response.description ? response.description : '',
          vendor_app_fqdn: response.vendor_app_fqdn ? response.vendor_app_fqdn : '',
          type: response.type ? response.type : '',
          authType: response.authType ? response.authType : '',
          geospec: response.geospec ? response.geospec : '',
          userTiers: response.userTiers ? response.userTiers : false,
          userManagament: response.userManagament ? response.userManagament : false,
          tiersArr: []
        }
        this.isCreateApp = false;
        this.openCreateAppPopupAction();
        this.createAppForm.form.markAllAsTouched();
      }
    });
  }

  receiveAppsData(event: any) {
    this.selectedVendorAppsData = event;
  }

  receiveAppsEditedData(event: any) {
    this.managementService.getVendorAppDetails(event.app_id);
  }

  openCreateAppPopup() {
    this.isCreateApp = true;
    this.initializeCreateAppData();
    this.openCreateAppPopupAction();
  }

  openCreateAppPopupAction() {
    this.createAppPopup = new bootstrap.Modal(document.getElementById("createAppModal"), {});
    this.createAppPopup.show();
  }

  deleteApps() {
    this.managementService.deleteVendorApp(this.selectedVendorAppsData[0]);
  }

  onCreateAppFormChange(event: any) {
    if (event && event.formData) {
      this.createAppForm = event.formData;
    }
    // console.log('abcd d creaeapp form', this.createAppForm);
    console.log('abcd d create app data model', this.createAppDataModel);
  }

  createVendorApp() {
    this.managementService.createVendorApp(this.createAppDataModel, this.isCreateApp);
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }

}
