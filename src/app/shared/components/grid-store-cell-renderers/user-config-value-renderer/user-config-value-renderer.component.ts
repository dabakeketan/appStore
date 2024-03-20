import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-user-config-value-renderer',
  templateUrl: './user-config-value-renderer.component.html',
  styleUrls: ['./user-config-value-renderer.component.scss']
})
export class UserConfigValueRendererComponent implements ICellRendererAngularComp {

  constructor() { }

  params: any;

  user_mgmt_enabled: boolean;

  user_tiers_enabled: boolean;

  tiersArr: Array<string>;

  agInit(params: any): void {
    this.params = params;
    this.user_mgmt_enabled = this.params.context.componentParent.configOptionsOnChanges.user_mgmt_enabled;
    this.user_tiers_enabled = this.params.context.componentParent.configOptionsOnChanges.user_tiers_enabled;
    this.tiersArr = this.params.context.componentParent.tiersArr;
    // console.log('abcd config renderer', params);
    // console.log('abcd config', this.user_mgmt_enabled, this.user_tiers_enabled)
  }

  refresh(): boolean {
    return false;
  }

}
