import { Component, OnInit } from '@angular/core';
import { CreateAppDataModel, UserTiers } from '../../models/managementModel';
import { RegExPatterns, errorMsgs } from 'src/app/constants';

@Component({
  selector: 'app-create-app',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.scss']
})
export class CreateAppComponent implements OnInit {

  createAppDataModel: CreateAppDataModel;

  errorMsgs = errorMsgs;

  regExPatterns = RegExPatterns;

  userTiers = UserTiers;

  constructor() { }

  ngOnInit(): void {
    this.createAppDataModel = {
      app_name: '',
      app_secret: '',
      description: '',
      vendor_app_fqdn: '',
      type: '',
      authType: '',
      geospec: '',
      userTier: 'Gold',
      file: ''
    }
  }

}
