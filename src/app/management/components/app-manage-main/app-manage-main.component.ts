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
    })
  }

  receiveVendorsData(event: any) {
    console.log('abcd', event);
    this.selectedVendorsData = event;
  }

  receiveVendorsEditedData(event: any) {
    console.log('abcd d', event);
    // this.managementService.navigateTo('/dashboard/main');
    this.createVendorDataModel = {
      contact_email: event.contact_email ? event.contact_email : '',
      contact_name: event.contact_name ? event.contact_name : '',
      contact_num: event.contact_num ? event.contact_num : '',
      vendor_name: event.vendor_name ? event.vendor_name : '',
      vendor_id: event.vendor_id ? event.vendor_id : ''
    }
    this.isUpdateVendor = true;
    this.openCreateVendorPopup();
  }

  rowAction(event: any) {
    if (event) {
      if (event.action === 'edit') {
        this.managementService.navigateTo('/manage/vendor/1234');
      }
    }
  }

  openCreateVendorPopup() {
    this.createVendorPopup = new bootstrap.Modal(document.getElementById("createVendorModal"), {});
    this.createVendorPopup.show();
  }

  createVendor() {
    this.managementService.createVendor(this.createVendorDataModel, this.isUpdateVendor);
  }

  deleteVendor() {

  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }

}
