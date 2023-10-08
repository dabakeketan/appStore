import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDefaultComponent } from './store-default.component';

describe('StoreDefaultComponent', () => {
  let component: StoreDefaultComponent;
  let fixture: ComponentFixture<StoreDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreDefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
