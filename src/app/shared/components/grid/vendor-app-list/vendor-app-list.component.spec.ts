import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAppListComponent } from './vendor-app-list.component';

describe('VendorAppListComponent', () => {
  let component: VendorAppListComponent;
  let fixture: ComponentFixture<VendorAppListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorAppListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorAppListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
