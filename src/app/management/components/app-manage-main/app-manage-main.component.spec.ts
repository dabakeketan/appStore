import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppManageMainComponent } from './app-manage-main.component';

describe('AppManageMainComponent', () => {
  let component: AppManageMainComponent;
  let fixture: ComponentFixture<AppManageMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppManageMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppManageMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
