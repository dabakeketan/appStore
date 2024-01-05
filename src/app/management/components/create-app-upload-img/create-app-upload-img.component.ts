import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { CreateAppDataModel } from '../../models/managementModel';
import { RegExPatterns, errorMsgs } from 'src/app/constants';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-app-upload-img',
  templateUrl: './create-app-upload-img.component.html',
  styleUrls: ['./create-app-upload-img.component.scss']
})
export class CreateAppUploadImgComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() createAppDataModel: CreateAppDataModel;

  @Input() clearImgSelection: boolean;

  errorMsgs = errorMsgs;

  regExPatterns = RegExPatterns;

  @ViewChild('createAppImgForm', { static: true }) public createAppImgForm: NgForm;

  @Output() onFormChange = new EventEmitter();

  destroySubscription = false;

  createAppFormSubscriber: any;

  @ViewChild('uploadIcon') uploadIcon: ElementRef;

  iconName = '';

  iconErrMsg = false;

  @ViewChild('uploadImage') uploadImage: ElementRef;

  appImgName = '';

  appImgErrMsg = false;

  elem = document.getElementById("appIcon")

  globalInstanceIcon: any;

  globalInstanceImage: any;

  constructor(private renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.createAppFormSubscriber = this.createAppImgForm.form.valueChanges.subscribe(x => {
      const tempObj = {
        formData: this.createAppImgForm
      }
      this.onFormChange.emit(tempObj);
    });
  }

  addEditIcon(event: any) {
    if (event && event.target.files && event.target.files.length) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const height = img.naturalHeight;
          const width = img.naturalWidth;
          if (width >= 300 && height >= 300) {
            this.iconErrMsg = false;
            this.createAppDataModel.app_icon_file = event.target.files[0];
            this.createAppDataModel.app_icon = img.src;
          } else {
            this.iconErrMsg = true;
            this.clearIconUpload();
          }
        };
      };
    } else {
      this.clearIconUpload();
    }
    console.log('abcd img upload', this.createAppDataModel);
  }

  clearIconUpload() {
    this.uploadIcon.nativeElement.value = '';
    this.createAppDataModel.app_icon_file = '';
    this.createAppDataModel.app_icon = '';
  }

  addEditImg(event: any) {
    if (event && event.target.files && event.target.files.length) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const height = img.naturalHeight;
          const width = img.naturalWidth;
          if (width >= 310 && height >= 210) {
            this.appImgErrMsg = false;
            this.createAppDataModel.app_image_file = event.target.files[0];
            this.createAppDataModel.app_image = img.src;
          } else {
            this.appImgErrMsg = true;
            this.clearImageUpload();
          }
        };
      };
    } else {
      this.clearImageUpload();
    }
    console.log('abcd img upload', this.createAppDataModel);
  }

  clearImageUpload() {
    this.uploadImage.nativeElement.value = '';
    this.createAppDataModel.app_image_file = '';
    this.createAppDataModel.app_image = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.createAppDataModel) {
    //   this.createAppImgForm.form.markAsUntouched();
    // }

    if (this.clearImgSelection) {
      this.uploadIcon.nativeElement.value = '';
      this.uploadImage.nativeElement.value = '';
      this.iconErrMsg = false;
      this.appImgErrMsg = false;
    }
  }

  ngAfterViewInit() {
    // this.globalInstanceIcon = this.renderer.listen(this.uploadIcon.nativeElement, 'change', () => {
    //   this.uploadIcon.nativeElement.value = '';
    //   this.createAppDataModel.app_icon_file = '';
    //   this.createAppDataModel.app_icon = '';
    // });
    // this.globalInstanceImage = this.renderer.listen(this.uploadImage.nativeElement, 'cancel', () => {
    //   this.uploadImage.nativeElement.value = '';
    //   this.createAppDataModel.app_image_file = '';
    //   this.createAppDataModel.app_image = '';
    // });
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
    this.createAppFormSubscriber.unsubscribe();
    // this.globalInstanceIcon();
    // this.globalInstanceImage();
  }

}
