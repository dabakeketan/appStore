import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CreateAppDataModel } from '../../models/managementModel';
import { RegExPatterns, errorMsgs } from 'src/app/constants';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-app-manage-users',
  templateUrl: './create-app-manage-users.component.html',
  styleUrls: ['./create-app-manage-users.component.scss']
})
export class CreateAppManageUsersComponent implements OnInit, OnDestroy {

  @Input() createAppDataModel: CreateAppDataModel;

  errorMsgs = errorMsgs;

  regExPatterns = RegExPatterns;

  @ViewChild('createAppMngUserForm', { static: true }) public createAppMngUserForm: NgForm;

  @Output() onFormChange = new EventEmitter();

  destroySubscription = false;

  createAppFormSubscriber: any;

  constructor() { }

  ngOnInit(): void {

    this.createAppFormSubscriber = this.createAppMngUserForm.form.valueChanges.subscribe(x => {
      const tempObj = {
        formData: this.createAppMngUserForm
      }
      this.onFormChange.emit(tempObj);
    });
  }

  onRowAction(event: any) {
    if (event) {
      if (event.action === 'tiersDrag') {
        // this.createAppDataModel.tiersArr = [];
        console.log('abcd event data', event.data);
        this.createAppDataModel.tiersArr = [];
        event.data.forEach((element: any) => {
          this.createAppDataModel.tiersArr.push(element);
        });
        console.log('abcd createdatamodel', this.createAppDataModel);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.createAppDataModel) {
      this.createAppMngUserForm.form.markAsUntouched();
    }
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
    this.createAppFormSubscriber.unsubscribe();
  }

}
