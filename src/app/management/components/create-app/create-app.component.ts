import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CreateAppDataModel } from '../../models/managementModel';
import { RegExPatterns, errorMsgs } from 'src/app/constants';
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
      this.createAppDataModel.userTiers = false;
    }
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
      this.createAppForm.form.markAsUntouched();
    }
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
    this.createAppFormSubscriber.unsubscribe();
  }

}
