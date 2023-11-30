import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RegExPatterns, errorMsgs } from 'src/app/constants';
import { ManagementService } from '../../services/management.service';
import { takeWhile } from 'rxjs';
import { NgForm } from '@angular/forms';
import { PartnerListDataModel } from '../../models/managementModel';

declare let bootstrap: any;

@Component({
  selector: 'app-manage-partner',
  templateUrl: './manage-partner.component.html',
  styleUrls: ['./manage-partner.component.scss']
})

export class ManagePartnerComponent implements OnInit, OnDestroy {

  inviteCodePopup: any;

  updatePartnerPopup: any;

  inviteEmailAddr = '';

  errorMsgs = errorMsgs;

  regExPatterns = RegExPatterns;

  destroySubscription = false;

  partnersListData: PartnerListDataModel[];

  updatePartnerDataModel: PartnerListDataModel;

  @ViewChild('addPartnerForm') public addPartnerForm: NgForm;

  @ViewChild('updatePartnerForm') public updatePartnerForm: NgForm;


  selectedPartnersData = [];

  constructor(private managementService: ManagementService) { }

  ngOnInit() {
    this.subscribtions();
    this.managementService.getPartnersList();
  }

  subscribtions() {
    this.updatePartnerDataModel = {
      api_endpoint: '',
      created_datetime_utc: '',
      description: '',
      partner_id: '',
      partner_name: '',
      portal_url: '',
      registration_status: '',
      short_name: '',
      contact_address: '',
      contact_email: '',
      contact_name: '',
      contact_num: '',
      oauth_client_id: '',
      oauth_client_secret: ''
    }
    this.managementService.partnersListDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.partnersListData = response;
      }
    });

    this.managementService.singlePartnerDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.updatePartnerDataModel = {
          api_endpoint: response.api_endpoint ? response.api_endpoint : '',
          created_datetime_utc: response.created_datetime_utc ? response.created_datetime_utc : '',
          description: response.description ? response.description : '',
          partner_id: response.partner_id ? response.partner_id : '',
          partner_name: response.partner_name ? response.partner_name : '',
          portal_url: response.portal_url ? response.portal_url : '',
          registration_status: response.registration_status ? response.registration_status : '',
          short_name: response.short_name ? response.short_name : '',
          contact_address: response.contact_address ? response.contact_address : '',
          contact_email: response.contact_email ? response.contact_email : '',
          contact_name: response.contact_name ? response.contact_name : '',
          contact_num: response.contact_num ? response.contact_num : '',
          oauth_client_id: response.oauth_client_id ? response.oauth_client_id : '',
          oauth_client_secret: response.oauth_client_secret ? response.oauth_client_secret : '',
        }
        this.openUpdatePartnerPopup();
        this.updatePartnerForm.form.markAllAsTouched();
      }
    });

    this.managementService.inviteCodePopupSubject.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.addPartnerForm.reset();
        setTimeout(() => {
          this.inviteCodePopup.hide();
        });
      }
    });

    this.managementService.updatePartnerDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.managementService.getPartnersList()
        this.updatePartnerForm.reset();
        setTimeout(() => {
          this.updatePartnerPopup.hide();
        });
      }
    });
  }

  openCreatePartnerPopup() {
    this.inviteCodePopup = new bootstrap.Modal(document.getElementById("addPertnerModal"), {});
    this.inviteCodePopup.show();
  }

  openUpdatePartnerPopup() {
    this.updatePartnerPopup = new bootstrap.Modal(document.getElementById("updatePartnerModal"), {});
    this.updatePartnerPopup.show();
  }

  createPartner() {
    this.managementService.createPartner(this.inviteEmailAddr);
  }

  receivePartnersData(event: any) {
    console.log('abcd', event);
    this.selectedPartnersData = event;
  }

  receivePartnerEditedData(event: any) {
    this.managementService.getPartner(event.partner_id);
  }

  deletePartners() {
    this.managementService.deletePartners(this.selectedPartnersData[0])
  }

  updatePartner() {
    this.managementService.updatePartner(this.updatePartnerDataModel);
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }

}
