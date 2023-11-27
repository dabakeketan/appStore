import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, DomLayoutType, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { RegStatusRendererComponent } from '../../cell-renderers/reg-status-renderer/reg-status-renderer.component';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnInit {

  @Input() rowData: any;

  // rowData: any;

  gridApi: GridApi;

  public frameworkComponents: any;

  @Output() rowSelectedEvent = new EventEmitter();

  @Output() rowEditedEvent = new EventEmitter();

  gridOptions: GridOptions;

 rowSelection: "single" | "multiple" = "single";

  selectedRows: any;

  public columnDefs: ColDef[] = [
    {
      headerName: 'Name',
      field: 'partner_name',
    },
    {
      headerName: 'Short Name',
      field: 'short_name',
    },
    {
      headerName: 'Description',
      field: 'description',
    },
    {
      headerName: 'API Endpoint',
      field: 'api_endpoint',
    },
    {
      headerName: 'Portal URL',
      field: 'portal_url',
    },
    {
      headerName: 'Registration Status',
      field: 'registration_status',
      cellRenderer: 'regStatusRenderer'
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
    this.frameworkComponents = {
      regStatusRenderer: RegStatusRendererComponent,
    }

    // this.gridOptions = {
    //   rowMultiSelectWithClick: true,
      
    //   // rowDeselection: true,
    //   context: { componentParent: this }
    // }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    // this.rowData = this.tableData;
    setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 500);
  }

  onRowSelected(event: any) {
    this.getSelectedRows();
  }

  getSelectedRows() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    this.selectedRows = selectedNodes.map(node => node.data);
    this.rowSelectedEvent.emit(this.selectedRows);
  }

  onRowDoubleClicked(event: any) {
    // this.rowEditedEvent.emit(event.data);
  }

  onResize(event: any) {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }

}
