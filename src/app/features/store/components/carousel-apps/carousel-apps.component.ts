import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PartnerDataModel } from 'src/app/account/models/accountModel';
import { AccountService } from 'src/app/account/services/account.service';

@Component({
  selector: 'app-carousel-apps',
  templateUrl: './carousel-apps.component.html',
  styleUrls: ['./carousel-apps.component.scss']
})
export class CarouselAppsComponent implements OnInit {

  @Input() carouselData: any;

  @Input() customOptions: OwlOptions = {};

  @Input() isEnable: Boolean = false;

  user: PartnerDataModel;

  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    this.user = this.accountService.getUser();
  }

  goToDetails(app_id: any) {
    this.accountService.goAppDetails(app_id);
  }

}
