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
    }
    this.managementService.partnersListDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.partnersListData = response;
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
    this.updatePartnerDataModel = {
      api_endpoint: event.api_endpoint ? event.api_endpoint : '',
      created_datetime_utc: event.created_datetime_utc ? event.created_datetime_utc : '',
      description: event.description ? event.description : '',
      partner_id: event.partner_id ? event.partner_id : '',
      partner_name: event.partner_name ? event.partner_name : '',
      portal_url: event.portal_url ? event.portal_url : '',
      registration_status: event.registration_status ? event.registration_status : '',
      short_name: event.short_name ? event.short_name : '',
    }
    this.openUpdatePartnerPopup();
  }

  deletePartners() {
    this.managementService.deletePartners(this.selectedPartnersData[0])
  }

  updatePartner() {

  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }

}
