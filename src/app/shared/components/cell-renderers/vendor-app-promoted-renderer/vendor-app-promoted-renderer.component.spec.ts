import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorAppPromotedRendererComponent } from './vendor-app-promoted-renderer.component';

describe('VendorAppPromotedRendererComponent', () => {
  let component: VendorAppPromotedRendererComponent;
  let fixture: ComponentFixture<VendorAppPromotedRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorAppPromotedRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorAppPromotedRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
