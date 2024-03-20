import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ColDef, DomLayoutType, GridApi, GridOptions, GridReadyEvent, IRowNode } from 'ag-grid-community';
import { CustomerEnabledUsersDataModel } from 'src/app/features/store/models/storeModel';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.scss']
})
export class DomainListComponent implements OnInit, OnChanges {

  @Input() rowData: any;

  @Input() anyChange: boolean;

  @Input() allUsersSearchText: string;

  @Input() configOptionsOnChanges: any;

  @Input() customerEnabledUsers: CustomerEnabledUsersDataModel[];

  gridApi: GridApi;

  // public frameworkComponents: any;

  @Output() rowSelectedEvent = new EventEmitter();

  @Output() rowEditedEvent = new EventEmitter();

  gridOptions: GridOptions;

  rowSelection: "single" | "multiple" = "multiple";

  selectedRows: any;

  public columnDefs: ColDef[] = [
    {
      headerName: 'Domain',
      field: 'domain',
      sort: 'asc',
      comparator: this.sharedService.textComparator,
      checkboxSelection: true,
    }
  ];

  public defaultColDef: ColDef = {
    sortable: true,
  };

  public domLayout: DomLayoutType = 'autoHeight';

  style: any = {
    width: '100%',
    height: '100%'
  };


  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.compInit();
  }

  compInit() {
    this.gridOptions = {
      components: {

      },
      defaultColDef: this.defaultColDef,
      animateRows: true,
      rowSelection: this.rowSelection,
      isRowSelectable: (rowNode: IRowNode) => {
        const abcd = this.customerEnabledUsers.some(item => {
          return item.domain === rowNode.data.domain;
        });
        if (abcd) {
          return false
        } else {
          return true;
        }
      },
      suppressRowClickSelection: true,
      pagination: true,
      paginationPageSize: 10,
      alwaysShowHorizontalScroll: false,
      domLayout: this.domLayout,
      context: { componentParent: this },
      onRowSelected: ($event) => {
        this.onRowSelected($event)
      },
      onRowDoubleClicked: ($event) => {
        this.onRowDoubleClicked($event);
      },
      onSortChanged: () => {
        // const sortModel = this.gridApi.getSortModel()[0];
        // if (sortModel) {

        // }
      },
      onFilterChanged: () => {
        // const filterModel = this.gridApi.getFilterModel();
      }
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.setColumnDefs(this.columnDefs);
    params.api.sizeColumnsToFit();
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

  clearRowSelection() {
    if (this.gridApi) {
      this.gridApi.deselectAll();
    }
  }

  onResize(event: any) {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.anyChange && this.gridApi) {
      this.gridApi.sizeColumnsToFit();
      this.anyChange = false;
    }

    if (this.customerEnabledUsers && this.gridApi) {
      this.gridApi.setRowData(this.rowData);
    }

    if (this.allUsersSearchText && this.gridApi) {
      this.gridApi.setQuickFilter(this.allUsersSearchText)
    } else if (!this.allUsersSearchText && this.gridApi) {
      this.gridApi.setQuickFilter('')
    }

    if (this.configOptionsOnChanges && this.configOptionsOnChanges.isClearSelection) {
      this.clearRowSelection();
    }
  }

}
