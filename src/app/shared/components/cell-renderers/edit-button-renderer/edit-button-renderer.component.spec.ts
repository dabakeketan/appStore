import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditButtonRendererComponent } from './edit-button-renderer.component';

describe('EditButtonRendererComponent', () => {
  let component: EditButtonRendererComponent;
  let fixture: ComponentFixture<EditButtonRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditButtonRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditButtonRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
