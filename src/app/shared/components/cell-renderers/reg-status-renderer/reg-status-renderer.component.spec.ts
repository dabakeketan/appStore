import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegStatusRendererComponent } from './reg-status-renderer.component';

describe('RegStatusRendererComponent', () => {
  let component: RegStatusRendererComponent;
  let fixture: ComponentFixture<RegStatusRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegStatusRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegStatusRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
