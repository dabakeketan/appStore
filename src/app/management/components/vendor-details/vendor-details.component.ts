import { Component, OnDestroy, OnInit } from '@angular/core';
import { ManagementService } from '../../services/management.service';
import { takeWhile } from 'rxjs';
import { AppListDataModel, CreateAppDataModel } from '../../models/managementModel';
import { NgForm } from '@angular/forms';
import { APP_TYPE_VALUES, AUTH_TYPE_VALUES, GEOSPEC_VALUES } from 'src/app/constants';
import { ActivatedRoute } from '@angular/router';

declare let bootstrap: any;

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit, OnDestroy {

  createAppPopup: any;

  createAppPopupA: any;

  createAppPopupB: any;

  appsListData: AppListDataModel[];

  selectedVendorAppsData = [];

  destroySubscription = false;

  createAppForm: NgForm;

  createAppImgForm: NgForm;

  createAppMngUserForm: NgForm;

  isCreateApp = true;

  createAppDataModel: CreateAppDataModel

  vendor_id: string;

  clearImgSelection = false;

  constructor(private managementService: ManagementService, private route: ActivatedRoute) {
    this.vendor_id = String(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.subscribtions();
    this.managementService.getVendorAppsList(this.vendor_id);
    this.initializeCreateAppData();
  }

  initializeCreateAppData() {
    this.createAppDataModel = {
      app_icon: '',
      app_icon_url: '',
      app_icon_file: '',
      app_icon_upload_url: '',
      app_image: '',
      app_image_url: '',
      app_image_file: '',
      app_image_upload_url: '',
      app_name: '',
      app_id: '',
      app_secret: '',
      description: '',
      short_description: '',
      vendor_app_fqdn: '',
      app_type: APP_TYPE_VALUES[0],
      auth_type: AUTH_TYPE_VALUES[0],
      geospec: GEOSPEC_VALUES[0],
      user_tiers_enabled: false,
      user_mgmt_enabled: false,
      tiersArr: [],
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
        this.createUpdateAppAction(response);
        this.isCreateApp = false;
        this.openCreateAppPopupAction();
      }
    });

    this.managementService.singleVendorAppDataSubA.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.createUpdateAppAction(response);
      }
    });

    this.managementService.createVendorAppDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.createUpdateAppAction(response);
        this.managementService.getVendorAppsList(this.vendor_id);
        // this.createAppPopup.hide();
        this.createAppDataModel.app_icon = this.createAppDataModel.app_image = this.createAppDataModel.app_icon_file = '';
        this.createAppDataModel.app_icon_file = this.createAppDataModel.app_image_file = this.createAppDataModel.app_image_upload_url = '';
        this.clearImgSelection = true;
        this.managementService.getImageUploadUrls(this.createAppDataModel.app_id);
        this.isCreateApp = false;
      }
    });

    this.managementService.appImageUrlsDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        // console.log('abcd image urls', response);
        this.createAppPopup.hide();
        this.createAppDataModel.app_icon_upload_url = response.app_icon_url;
        this.createAppDataModel.app_image_upload_url = response.app_image_url;
        this.openCreateAppPopupActionA();
      }
    });

    this.managementService.tiersDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        // console.log('abcd tiers', response);
        let tiersPendingLength = 0;
        this.createAppDataModel.tiersArr = [];
        if (!response.length) {
          this.updateTiers(5);
        } else if (response.length) {
          for (let index = 0; index < response.length; index++) {
            let tempObj = {
              name: response[index]
            }
            this.createAppDataModel.tiersArr.push(tempObj);
          }
          tiersPendingLength = 5 - response.length;
          this.updateTiers(tiersPendingLength);
        }
        this.createAppPopupA.hide();
        this.openCreateAppPopupActionB();
      }
    });

    this.managementService.uploadImgDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.managementService.getVendorAppDetailsA(this.createAppDataModel.app_id);
        if (this.createAppDataModel.user_mgmt_enabled && this.createAppDataModel.user_tiers_enabled) {
          this.goToLastStep();
        } else {
          this.managementService.getVendorAppsList(this.vendor_id);
          this.createAppPopupA.hide();
        }
      }
    });

    this.managementService.tiersUpdateDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        // console.log('abcd tiers response', response);
        this.managementService.getVendorAppsList(this.vendor_id);
        this.createAppPopupB.hide();
      }
    });

    this.managementService.deleteAppDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.managementService.getVendorAppsList(this.vendor_id);
      }
    });
  }

  updateTiers(length: any) {
    for (let index = 0; index < length; index++) {
      let tempObj = {
        name: ''
      }
      this.createAppDataModel.tiersArr.push(tempObj);
    }
  }


  createUpdateAppAction(response: CreateAppDataModel) {
    this.createAppDataModel = {
      app_icon: '',
      app_icon_file: '',
      app_icon_url: response.app_icon_url ? response.app_icon_url
        : this.createAppDataModel.app_icon_url ? this.createAppDataModel.app_icon_url : '',
      app_icon_upload_url: this.createAppDataModel.app_icon_upload_url ?
        this.createAppDataModel.app_icon_upload_url : '',
      app_image: '',
      app_image_file: '',
      app_image_url: response.app_image_url ? response.app_image_url
        : this.createAppDataModel.app_image_url ? this.createAppDataModel.app_image_url : '',
      app_image_upload_url: this.createAppDataModel.app_image_upload_url ?
        this.createAppDataModel.app_image_upload_url : '',
      app_name: response.app_name ? response.app_name : '',
      app_id: response.app_id ? response.app_id : '',
      app_secret: response.app_secret ? response.app_secret : '',
      description: response.description ? response.description : '',
      short_description: response.short_description ? response.short_description : '',
      vendor_app_fqdn: response.vendor_app_fqdn ? response.vendor_app_fqdn : '',
      app_type: response.app_type ? response.app_type : '',
      auth_type: response.auth_type ? response.auth_type : '',
      geospec: response.geospec ? response.geospec : '',
      user_tiers_enabled: response.user_tiers_enabled ? response.user_tiers_enabled : false,
      user_mgmt_enabled: response.user_mgmt_enabled ? response.user_mgmt_enabled : false,
      tiersArr: this.createAppDataModel.tiersArr ? this.createAppDataModel.tiersArr : []
    }
  }

  receiveAppsData(event: any) {
    this.selectedVendorAppsData = event;
  }

  receiveAppsEditedData(event: any) {
    this.managementService.getVendorAppDetails(event.app_id);
  }

  openCreateAppPopup() {
    this.isCreateApp = true;
    this.createAppForm.form.reset();
    setTimeout(() => {
      this.initializeCreateAppData();
    });
    this.openCreateAppPopupAction();
  }

  openCreateAppPopupAction() {
    this.createAppPopup = new bootstrap.Modal(document.getElementById("createAppModal"), {
      backdrop: 'static', keyboard: false
    });
    this.createAppPopup.show();
  }

  openCreateAppPopupActionA() {
    // console.log('abcd createdatamodel', this.createAppDataModel);
    this.createAppPopupA = new bootstrap.Modal(document.getElementById("createAppModalA"), {
      backdrop: 'static', keyboard: false
    });
    this.createAppPopupA.show();
  }

  openCreateAppPopupActionB() {
    // console.log('abcd createdatamodel', this.createAppDataModel);
    this.createAppPopupB = new bootstrap.Modal(document.getElementById("createAppModalB"), {
      backdrop: 'static', keyboard: false
    });
    this.createAppPopupB.show();
  }

  deleteApps() {
    this.managementService.deleteVendorApp(this.selectedVendorAppsData[0]);
  }

  onCreateAppFormChange(event: any) {
    if (event && event.formData) {
      this.createAppForm = event.formData;
      // console.log('abcd d create app data model', this.createAppDataModel);
    }
    // console.log('abcd d creaeapp form', this.createAppForm);
  }

  createVendorApp() {
    this.managementService.createVendorApp(this.createAppDataModel, this.vendor_id, this.isCreateApp);
  }

  onCreateAppImgFormChange(event: any) {
    if (event && event.formData) {
      this.createAppImgForm = event.formData;
      // console.log('abcd d create app data model', this.createAppDataModel);
    }
  }

  createVendorAppImg() {
    if (!this.createAppDataModel.app_icon_file && !this.createAppDataModel.app_image_file) {
      this.goToLastStep();
    } else {
      this.managementService.createVendorAppImg(this.createAppDataModel);
    }
  }

  finishAppCreation() {
    if (!this.createAppDataModel.app_icon_file && !this.createAppDataModel.app_image_file) {
      this.createAppPopupA.hide();
    } else {
      this.managementService.createVendorAppImg(this.createAppDataModel);
    }
  }

  onCreateAppMngUserFormChange(event: any) {
    if (event && event.formData) {
      this.createAppMngUserForm = event.formData;
      // console.log('abcd d create app data model', this.createAppDataModel);
    }
  }

  onRowAction(event: any) {
    if (event) {
      if (event.action === 'tiersDrag') {
        this.createAppDataModel.tiersArr = event.data;
        // console.log('abcd createdatamodel', this.createAppDataModel);
      }
    }
  }

  postTiers() {
    // console.log('abcd tiersarr', this.createAppDataModel.tiersArr);
    this.managementService.postTiers(this.createAppDataModel);
  }

  goToFirstStep() {
    this.createAppPopupA.hide();
    this.openCreateAppPopupAction();
  }

  goToLastStep() {
    this.managementService.getTiers(this.createAppDataModel.app_id);
  }

  goToSecondStep() {
    this.createAppPopupB.hide();
    this.openCreateAppPopupActionA();
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }

}
