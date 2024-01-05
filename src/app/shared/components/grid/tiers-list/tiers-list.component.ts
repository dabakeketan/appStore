import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridApi, GridOptions, ColDef, DomLayoutType, GridReadyEvent, CellEditingStoppedEvent } from 'ag-grid-community';
import { TierNameRendererComponent } from '../../cell-renderers/tier-name-renderer/tier-name-renderer.component';

@Component({
  selector: 'app-tiers-list',
  templateUrl: './tiers-list.component.html',
  styleUrls: ['./tiers-list.component.scss']
})
export class TiersListComponent implements OnInit, OnChanges {

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
      headerName: '#',
      valueGetter: params => {
        return Number(`${params.node?.rowIndex}`) + 1
      },
      rowDrag: true
    },
    {
      headerName: 'Tiers',
      field: 'name',
      cellRenderer: 'tierNameRenderer',
      cellEditor: 'agTextCellEditor',
      editable: true,
    }
  ];

  public defaultColDef: ColDef = {
    sortable: false,
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
      tierNameRenderer: TierNameRendererComponent,
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

  onCellEditingStopped(event: CellEditingStoppedEvent) {
    console.log('cellEditingStopped', this.gridApi);
  }

  OnRowDragEnd(event: any) {
    // console.log('abcd', this.gridApi.getModel());

    this.gridApi.refreshCells();
    // console.log('abcd', this.rowData);
    const tmepArr: any = [];
    this.gridApi.forEachNodeAfterFilterAndSort(item => {
      // console.log('abcd', item.data);
      tmepArr.push(item.data);
    });
    const tempObj = {
      action: 'tiersDrag',
      data: tmepArr
    }
    this.rowActionEvent.emit(tempObj);
  }

  onResize(event: any) {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }

}

