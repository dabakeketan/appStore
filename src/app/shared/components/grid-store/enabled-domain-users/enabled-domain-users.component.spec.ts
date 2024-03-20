import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnabledDomainUsersComponent } from './enabled-domain-users.component';

describe('EnabledDomainUsersComponent', () => {
  let component: EnabledDomainUsersComponent;
  let fixture: ComponentFixture<EnabledDomainUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnabledDomainUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnabledDomainUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
