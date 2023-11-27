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

  inviteEmailAddr = '';

  errorMsgs = errorMsgs;

  regExPatterns = RegExPatterns;

  destroySubscription = false;

  partnersListData: PartnerListDataModel[];

  @ViewChild('addPartnerForm') public addPartnerForm: NgForm;

  selectedPartnersData = [];

  constructor(private managementService: ManagementService) { }

  ngOnInit() {
    this.subscribtions();
    this.managementService.getPartnersList();
  }

  subscribtions() {
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

  createPartner() {
    this.managementService.createPartner(this.inviteEmailAddr);
  }

  receivePartnersData(event: any) {
    console.log('abcd', event);
    this.selectedPartnersData = event;
  }

  deletePartners() {
    this.managementService.deletePartners(this.selectedPartnersData[0])
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }

}
