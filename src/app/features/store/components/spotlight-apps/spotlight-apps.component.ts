import { Component, Input, OnInit } from '@angular/core';
import { AppDataModel } from '../../models/storeModel';
import { AccountService } from 'src/app/account/services/account.service';

@Component({
  selector: 'app-spotlight-apps',
  templateUrl: './spotlight-apps.component.html',
  styleUrls: ['./spotlight-apps.component.scss']
})
export class SpotlightAppsComponent implements OnInit {

  @Input() spotlightApps: Array<AppDataModel> = [];

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  gotoDetails(app_id: any) {
    this.accountService.goAppDetails(app_id);
  }
}
