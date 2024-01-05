import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ManagementService } from '../../services/management.service';
import { takeWhile } from 'rxjs';
import { CreateVendorDataModel, VendorsListDataModel } from '../../models/managementModel';
import { RegExPatterns, errorMsgs } from 'src/app/constants';
import { NgForm } from '@angular/forms';

declare let bootstrap: any;

@Component({
  selector: 'app-app-manage-main',
  templateUrl: './app-manage-main.component.html',
  styleUrls: ['./app-manage-main.component.scss']
})
export class AppManageMainComponent implements OnInit, OnDestroy {

  createVendorPopup: any;

  vendorsListData: VendorsListDataModel[];

  selectedVendorsData = [];

  createVendorDataModel: CreateVendorDataModel;

  destroySubscription = false;

  errorMsgs = errorMsgs;

  regExPatterns = RegExPatterns;

  isUpdateVendor = false;

  @ViewChild('createVendorForm') public createVendorForm: NgForm;

  constructor(private managementService: ManagementService) { }

  ngOnInit(): void {
    this.subscribtions();
    this.managementService.getVendorsList();
  }

  subscribtions() {
    this.createVendorDataModel = {
      contact_email: '',
      contact_name: '',
      contact_num: '',
      vendor_name: '',
      vendor_id: ''
    }
    this.managementService.vendorsListDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.vendorsListData = response;
      }
    });

    this.managementService.createVendorDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.createVendorForm.form.reset();
        this.createVendorPopup.hide();
      }
    });

    this.managementService.singleVendorDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.createVendorDataModel = {
          contact_email: response.contact_email ? response.contact_email : '',
          contact_name: response.contact_name ? response.contact_name : '',
          contact_num: response.contact_num ? response.contact_num : '',
          vendor_name: response.vendor_name ? response.vendor_name : '',
          vendor_id: response.vendor_id ? response.vendor_id : ''
        }
        this.isUpdateVendor = true;
        this.openCreateVendorPopup();
        this.createVendorForm.form.markAllAsTouched();
      }
    });

    this.managementService.vendorEditClickSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        // console.log('abcd vendor edit click', response);
        if (response && response.data && response.data.vendor_id) {
          this.managementService.navigateTo('/manage/vendor/' + response.data.vendor_id);
        }
      }
    })
  }

  receiveVendorsData(event: any) {
    // console.log('abcd', event);
    this.selectedVendorsData = event;
  }

  receiveVendorsEditedData(event: any) {
    // console.log('abcd d', event);
    this.managementService.getVendor(event.vendor_name);
  }

  rowAction(event: any) {
    // if (event) {
    //   console.log('abcd vendor id', event);
    //   if (event.action === 'edit') {
    //     this.managementService.navigateTo('/manage/vendor/1234');
    //   }
    // }
  }

  openCreateVendorPopup() {
    this.createVendorPopup = new bootstrap.Modal(document.getElementById("createVendorModal"), {});
    this.createVendorPopup.show();
  }

  createVendor() {
    this.managementService.createVendor(this.createVendorDataModel, this.isUpdateVendor);
  }

  deleteVendor() {
    this.managementService.deleteVendor(this.selectedVendorsData[0]);
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }

}
