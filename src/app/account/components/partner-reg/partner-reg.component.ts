import { Component, OnInit } from '@angular/core';
import { RegExPatterns, categoriesArr, errorMsgs, headerTexts, productsArr } from 'src/app/constants';
import { CreatePartnerModel } from '../../models/accountModel';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-partner-reg',
  templateUrl: './partner-reg.component.html',
  styleUrls: ['./partner-reg.component.scss']
})
export class PartnerRegComponent implements OnInit {

  headerTexts = headerTexts;

  categoriesArr = categoriesArr;

  productsArr = productsArr;

  errorMsgs = errorMsgs;

  createPartnerModel: CreatePartnerModel;

  regExPatterns = RegExPatterns;

  constructor(private accountService: AccountService) {
    this.createPartnerModel = {
      api_endpoint: '',
      description: '',
      oauth_client_id: '',
      oauth_client_secret: '',
      portal_url: '',
      short_name: '',
      contact_name: '',
      contact_email:'',
      contact_num: '',
      contact_address: ''
    }
  }

  ngOnInit(): void {

  }

  goHome() {
    this.accountService.goHome();
  }

  registerPartner() {
    this.accountService.registerPartner(this.createPartnerModel);
  }

}
