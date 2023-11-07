import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, DomLayoutType, GridApi, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnInit {

  @Input() tableData: any;

  rowData: any;

  gridApi: GridApi;

  public columnDefs: ColDef[] = [
    { 
      headerName: 'Partner Name', field: 'name',
      minWidth: 100
    }
  ];

  public defaultColDef: ColDef = {
    sortable: true
  };

  public paginationPageSize = 10;

  public domLayout: DomLayoutType = 'autoHeight';

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  style: any = {
    width: '100%',
    height: '100%'
  };

  constructor() { }

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.rowData = this.tableData;
    setTimeout(() => {
    params.api.sizeColumnsToFit();
    }, 500);
  }

  onResize(event: any) {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }

}
