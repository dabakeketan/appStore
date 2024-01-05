import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CreateAppDataModel } from '../../models/managementModel';
import { APP_TYPE_VALUES, AUTH_TYPE_VALUES, GEOSPEC_VALUES, RegExPatterns, errorMsgs } from 'src/app/constants';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-app',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.scss']
})
export class CreateAppComponent implements OnInit, OnChanges, OnDestroy {

  @Input() createAppDataModel: CreateAppDataModel;

  errorMsgs = errorMsgs;

  regExPatterns = RegExPatterns;

  @ViewChild('createAppForm', { static: true }) public createAppForm: NgForm;

  @Output() onFormChange = new EventEmitter();

  destroySubscription = false;

  createAppFormSubscriber: any;

  APP_TYPE_VALUES = APP_TYPE_VALUES;

  AUTH_TYPE_VALUES = AUTH_TYPE_VALUES;

  GEOSPEC_VALUES = GEOSPEC_VALUES;

  constructor() { }

  ngOnInit(): void {


    this.createAppFormSubscriber = this.createAppForm.form.valueChanges.subscribe(x => {
      const tempObj = {
        formData: this.createAppForm
      }
      this.onFormChange.emit(tempObj);
    });
  }

  userMngmntSwitchChange(event: any) {
    const val = event.target.checked
    if (!val) {
      this.createAppDataModel.user_tiers_enabled = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.createAppDataModel) {
      // this.createAppForm.form.markAsUntouched();
    }
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
    this.createAppFormSubscriber.unsubscribe();
  }

}
