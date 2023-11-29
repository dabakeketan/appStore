import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-edit-button-renderer',
  templateUrl: './edit-button-renderer.component.html',
  styleUrls: ['./edit-button-renderer.component.scss']
})
export class EditButtonRendererComponent implements ICellRendererAngularComp {

  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  handleActionClickEvent(event: any) {
    this.params.clicked(this.params.value);
  }

  refresh(): boolean {
    return false;
  }
}
