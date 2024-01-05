import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, GridOptions, ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { RegStatusRendererComponent } from '../../cell-renderers/reg-status-renderer/reg-status-renderer.component';
import { EditButtonRendererComponent } from '../../cell-renderers/edit-button-renderer/edit-button-renderer.component';

@Component({
  selector: 'app-vendors-list',
  templateUrl: './vendors-list.component.html',
  styleUrls: ['./vendors-list.component.scss']
})
export class VendorsListComponent implements OnInit {

  @Input() rowData: any;

  // rowData: any;

  gridApi: GridApi;

  public frameworkComponents: any;

  @Output() rowSelectedEvent = new EventEmitter();

  @Output() rowEditedEvent = new EventEmitter();

  @Output() rowActionEvent = new EventEmitter();

  gridOptions: GridOptions;

 rowSelection: "single" | "multiple" = "single";

  selectedRows: any;

  public columnDefs: ColDef[] = [
    {
      headerName: 'Name',
      field: 'vendor_name',
    },
    {
      headerName: 'Contact Name',
      field: 'contact_name',
    },
    {
      headerName: 'Contact Email',
      field: 'contact_email',
    },
    {
      headerName: 'Contact Num',
      field: 'contact_num',
    },
    {
      headerName: 'Action',
      headerClass: 'header-label-center',
      cellRenderer: 'editButtonRenderer',
      // cellRendererParams: {
      //   clicked: (params: any) => {
      //     console.log('abcd aa', this.gridApi.getSelectedRows())
      //     const obj = {
      //       action: 'edit'
      //     }
      //     this.rowActionEvent.emit(obj);
      //   }
      // }
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

  constructor() { 
  }

  ngOnInit(): void {
    this.frameworkComponents = {
      editButtonRenderer: EditButtonRendererComponent
      // regStatusRenderer: RegStatusRendererComponent,
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
