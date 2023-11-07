import { Component, OnInit } from '@angular/core';
import { RegExPatterns, errorMsgs } from 'src/app/constants';

declare let bootstrap: any;

@Component({
  selector: 'app-manage-partner',
  templateUrl: './manage-partner.component.html',
  styleUrls: ['./manage-partner.component.scss']
})

export class ManagePartnerComponent implements OnInit {

  dummyData = [
    {
      name: 'Partner A',
      model: 'Abcd',
      price: 30
    },
    {
      name: 'Partner B',
      model: 'Abcd',
      price: 30
    },
    {
      name: 'Partner C',
      model: 'Abcd',
      price: 30
    },
    {
      name: 'Partner D',
      model: 'Abcd',
      price: 30
    }
  ];

  inviteCodePopup: any;

  inviteCode = '';

  errorMsgs = errorMsgs;

  regExPatterns = RegExPatterns;

  constructor() { }

  ngOnInit(): void {
  }

  openInviteCodePopup() {
    this.inviteCodePopup = new bootstrap.Modal(document.getElementById("addPertnerModal"), {});
    this.inviteCodePopup.show();
  }

}
