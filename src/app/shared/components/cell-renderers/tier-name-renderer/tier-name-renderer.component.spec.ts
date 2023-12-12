import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TierNameRendererComponent } from './tier-name-renderer.component';

describe('TierNameRendererComponent', () => {
  let component: TierNameRendererComponent;
  let fixture: ComponentFixture<TierNameRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TierNameRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TierNameRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
