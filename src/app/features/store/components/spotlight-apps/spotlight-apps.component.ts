import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataModel } from '../../models/storeModel';

@Component({
  selector: 'app-spotlight-apps',
  templateUrl: './spotlight-apps.component.html',
  styleUrls: ['./spotlight-apps.component.scss']
})
export class SpotlightAppsComponent implements OnInit {

  @Input() spotlightApps: Array<AppDataModel> = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  gotoDetails(app_id: any) {
    this.router.navigateByUrl('/store/app/' + app_id);
  }
}
