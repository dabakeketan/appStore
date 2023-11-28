import { Component, OnDestroy, OnInit } from '@angular/core';
import { MNGUrls, RegExPatterns, categoriesArr, errorMsgs, headerTexts, productsArr } from 'src/app/constants';
import { CreatePartnerModel } from '../../models/accountModel';
import { AccountService } from '../../services/account.service';
import { SharedService } from 'src/app/shared/shared.service';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-partner-reg',
  templateUrl: './partner-reg.component.html',
  styleUrls: ['./partner-reg.component.scss']
})
export class PartnerRegComponent implements OnInit, OnDestroy {

  headerTexts = headerTexts;

  categoriesArr = categoriesArr;

  productsArr = productsArr;

  errorMsgs = errorMsgs;

  createPartnerModel: CreatePartnerModel;

  regExPatterns = RegExPatterns;

  isRegisterScreen = false;

  inviteCodeStr = '';

  destroySubscription = false;

  constructor(private accountService: AccountService, private sharedService: SharedService) {
    this.createPartnerModel = {
      api_endpoint: '',
      description: '',
      oauth_client_id: '',
      oauth_client_secret: '',
      portal_url: '',
      short_name: '',
      contact_name: '',
      contact_email: '',
      contact_num: '',
      contact_address: ''
    }
  }

  ngOnInit(): void {

  }

  goHome() {
    this.accountService.goHome();
  }

  validateInviteCode() {
    this.sharedService.getRequest(MNGUrls.validateInviteCode + this.inviteCodeStr)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            this.isRegisterScreen = true;
          }
        }
      });
  }

  registerPartner() {
    this.accountService.registerPartner(this.createPartnerModel);
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }

}
