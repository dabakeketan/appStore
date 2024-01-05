import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { ManagementService } from 'src/app/management/services/management.service';

@Component({
  selector: 'app-edit-button-renderer',
  templateUrl: './edit-button-renderer.component.html',
  styleUrls: ['./edit-button-renderer.component.scss']
})
export class EditButtonRendererComponent implements ICellRendererAngularComp {

  private params: any;

  constructor(private managementService: ManagementService) {

  }

  agInit(params: any): void {
    this.params = params;
  }

  // handleActionClickEvent(event: any) {
  //   this.params.clicked(this.params.value);
  // }

  handleActionClickEvent(event: any) {
    this.managementService.vendorEditClickSub.next(this.params);
  }

  refresh(): boolean {
    return false;
  }
}
