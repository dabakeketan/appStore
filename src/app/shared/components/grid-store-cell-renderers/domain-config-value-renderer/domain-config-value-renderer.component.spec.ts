import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainConfigValueRendererComponent } from './domain-config-value-renderer.component';

describe('DomainConfigValueRendererComponent', () => {
  let component: DomainConfigValueRendererComponent;
  let fixture: ComponentFixture<DomainConfigValueRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomainConfigValueRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomainConfigValueRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
