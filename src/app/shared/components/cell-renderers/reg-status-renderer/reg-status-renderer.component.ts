import { Component, OnInit } from '@angular/core';
import { ILoadingCellRendererAngularComp } from 'ag-grid-angular';
import { ILoadingCellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-reg-status-renderer',
  templateUrl: './reg-status-renderer.component.html',
  styleUrls: ['./reg-status-renderer.component.scss']
})


export class RegStatusRendererComponent implements ILoadingCellRendererAngularComp {
  public params: ILoadingCellRendererParams & { loadingMessage: string };

  complete = false;

  agInit(params: ILoadingCellRendererParams & { loadingMessage: string }): void {
      this.params = params;
      // console.log('abcd', this.params);
      if(this.params.data.registration_status === 'COMPLETE') {
        this.complete = true;
      }
  }
}
