import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppManageUsersComponent } from './create-app-manage-users.component';

describe('CreateAppManageUsersComponent', () => {
  let component: CreateAppManageUsersComponent;
  let fixture: ComponentFixture<CreateAppManageUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAppManageUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAppManageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
