import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConfigValueRendererComponent } from './user-config-value-renderer.component';

describe('UserConfigValueRendererComponent', () => {
  let component: UserConfigValueRendererComponent;
  let fixture: ComponentFixture<UserConfigValueRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserConfigValueRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserConfigValueRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
