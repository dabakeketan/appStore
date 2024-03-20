import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-domain-config-value-renderer',
  templateUrl: './domain-config-value-renderer.component.html',
  styleUrls: ['./domain-config-value-renderer.component.scss']
})
export class DomainConfigValueRendererComponent implements ICellRendererAngularComp {

  constructor() { }

  params: any;

  domain_mgmt_enabled: boolean;

  domain_tiers_enabled: boolean;

  tiersArr: Array<string>;

  agInit(params: any): void {
    this.params = params;
    this.domain_mgmt_enabled = this.params.context.componentParent.configOptionsOnChanges.domain_mgmt_enabled;
    this.domain_tiers_enabled = this.params.context.componentParent.configOptionsOnChanges.domain_tiers_enabled;
    this.tiersArr = this.params.context.componentParent.tiersArr;
    // console.log('abcd config renderer', params);
    // console.log('abcd config', this.user_mgmt_enabled, this.user_tiers_enabled)
  }

  refresh(): boolean {
    return false;
  }
}
