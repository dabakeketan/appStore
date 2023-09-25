import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotlightAppsComponent } from './spotlight-apps.component';

describe('SpotlightAppsComponent', () => {
  let component: SpotlightAppsComponent;
  let fixture: ComponentFixture<SpotlightAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotlightAppsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotlightAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
