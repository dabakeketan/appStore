import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppUploadImgComponent } from './create-app-upload-img.component';

describe('CreateAppUploadImgComponent', () => {
  let component: CreateAppUploadImgComponent;
  let fixture: ComponentFixture<CreateAppUploadImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAppUploadImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAppUploadImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
