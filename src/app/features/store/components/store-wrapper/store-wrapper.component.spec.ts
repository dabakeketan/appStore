import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreWrapperComponent } from './store-wrapper.component';

describe('StoreWrapperComponent', () => {
  let component: StoreWrapperComponent;
  let fixture: ComponentFixture<StoreWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
