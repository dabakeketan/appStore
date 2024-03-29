import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, GridOptions, ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { VendorAppPromotedRendererComponent } from '../../cell-renderers/vendor-app-promoted-renderer/vendor-app-promoted-renderer.component';

@Component({
  selector: 'app-vendor-app-list',
  templateUrl: './vendor-app-list.component.html',
  styleUrls: ['./vendor-app-list.component.scss']
})
export class VendorAppListComponent implements OnInit {

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
      field: 'app_name',
    },
    {
      headerName: 'Description',
      field: 'short_description',
    },
    {
      headerName: 'Application Status',
      headerClass: 'header-label-center',
      cellRenderer: (params: any) => {
        let divOuter = document.createElement('div');
        divOuter.classList.add('text-center');
        let divInner = document.createElement('div');
        divInner.classList.add('badge');
        if (params.data && params.data.app_status) {
          if (params.data.app_status === 'IN_REVIEW') {
            divInner.innerHTML = 'In Review';
            divInner.classList.add('btn-custom-info');
          } else if (params.data.app_status === 'PUBLISHED') {
            divInner.innerHTML = 'Published';
            divInner.classList.add('btn-custom-pri');
          }
          else if (params.data.app_status === 'REVOKED') {
            divInner.innerHTML = 'Revoked';
            divInner.classList.add('btn-custom-danger');
          } else {
            divInner.innerHTML = '';
          }
        } else {
          divInner.innerHTML = '';
        }
        divOuter.appendChild(divInner);
        return divOuter;
      }
    },
    {
      headerName: 'Promoted Status',
      field: 'promoted_app',
      cellRenderer: 'vendorAppPromotedRenderer',
      headerClass: 'header-label-center'
    },
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
      vendorAppPromotedRenderer: VendorAppPromotedRendererComponent,
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
    // setTimeout(() => {
    params.api.sizeColumnsToFit();
    // }, 500);
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
    this.rowEditedEvent.emit(event.data);
  }

  onResize(event: any) {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }


}
