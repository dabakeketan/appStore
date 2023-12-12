import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-tier-name-renderer',
  templateUrl: './tier-name-renderer.component.html',
  styleUrls: ['./tier-name-renderer.component.scss']
})
export class TierNameRendererComponent implements ICellRendererAngularComp {
  
 params: any;

  agInit(params: any): void {
    this.params = params;
    console.log(params);
  }

  refresh(): boolean {
    return false;
  }
}
