import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ColDef, DomLayoutType, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { SharedService } from 'src/app/shared/shared.service';
import { DomainConfigValueRendererComponent } from '../../grid-store-cell-renderers/domain-config-value-renderer/domain-config-value-renderer.component';

@Component({
  selector: 'app-enabled-domain-users',
  templateUrl: './enabled-domain-users.component.html',
  styleUrls: ['./enabled-domain-users.component.scss']
})
export class EnabledDomainUsersComponent implements OnInit, OnChanges {

  @Input() rowData: any;

  @Input() anyChange: boolean;

  @Input() allUsersSearchText: string;

  @Input() configOptionsOnChanges: any;

  @Input() tiersArr: Array<string>;

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
      comparator: this.sharedService.textComparator
    },
    {
      headerName: 'Value',
      field: 'config_value',
      sortable: false,
      cellRenderer: 'confgValueRenderer',
      headerClass: 'header-label-center',
    }
  ];

  public defaultColDef: ColDef = {
    sortable: true
  };

  public domLayout: DomLayoutType = 'autoHeight';

  style: any = {
    width: '100%',
    height: '100%'
  };

  constructor(private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.compInit();
  }

  compInit() {
    this.gridOptions = {
      components: {
        confgValueRenderer: DomainConfigValueRendererComponent
      },
      columnDefs: this.columnDefs,
      defaultColDef: this.defaultColDef,
      animateRows: true,
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
      onGridReady: ($event) => {
        this.onGridReady($event);
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
    this.rowEditedEvent.emit(event.data);
  }

  clearRowSelection() {
    if (this.gridApi) {
      this.gridApi.deselectAll();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('abcd enabled row data on change', this.rowData);
    if ((this.anyChange) && this.gridApi) {
      this.gridApi.sizeColumnsToFit();
      this.anyChange = false;
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
