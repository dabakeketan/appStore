import { Component, OnInit } from '@angular/core';
import { ILoadingCellRendererAngularComp } from 'ag-grid-angular';
import { ILoadingCellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-vendor-app-promoted-renderer',
  templateUrl: './vendor-app-promoted-renderer.component.html',
  styleUrls: ['./vendor-app-promoted-renderer.component.scss']
})
export class VendorAppPromotedRendererComponent implements ILoadingCellRendererAngularComp {

  public params: ILoadingCellRendererParams & { loadingMessage: string };

  isPromoted = false;

  agInit(params: ILoadingCellRendererParams & { loadingMessage: string }): void {
      this.params = params;
      // console.log('abcd', this.params)
      if(this.params.data.promoted_app) {
        this.isPromoted = true;
      }
  }
}
