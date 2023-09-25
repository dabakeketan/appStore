import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnabledAppsComponent } from './enabled-apps.component';

describe('EnabledAppsComponent', () => {
  let component: EnabledAppsComponent;
  let fixture: ComponentFixture<EnabledAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnabledAppsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnabledAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
