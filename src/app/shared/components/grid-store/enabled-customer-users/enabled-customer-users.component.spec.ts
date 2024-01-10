import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnabledCustomerUsersComponent } from './enabled-customer-users.component';

describe('EnabledCustomerUsersComponent', () => {
  let component: EnabledCustomerUsersComponent;
  let fixture: ComponentFixture<EnabledCustomerUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnabledCustomerUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnabledCustomerUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
