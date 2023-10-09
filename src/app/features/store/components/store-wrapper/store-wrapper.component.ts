import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartnerDataModel } from 'src/app/account/models/accountModel';
import { AccountService } from 'src/app/account/services/account.service';

@Component({
  selector: 'app-store-wrapper',
  templateUrl: './store-wrapper.component.html',
  styleUrls: ['./store-wrapper.component.scss']
})
export class StoreWrapperComponent implements OnInit {

  user: PartnerDataModel;

  partner_name = '';

  constructor(private route: ActivatedRoute, private accountService: AccountService) { 
    this.partner_name = String(this.route.snapshot.paramMap.get('partner_name'));
    // console.log('login main wrapper', this.route);
    this.user = this.accountService.getUser();
    if (this.user) {
      this.accountService.goHome();
    } else {
      this.accountService.login(this.partner_name);
    }
  }

  ngOnInit(): void {
  }

}
