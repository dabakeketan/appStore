import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMainComponent } from './alert-main.component';

describe('AlertMainComponent', () => {
  let component: AlertMainComponent;
  let fixture: ComponentFixture<AlertMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
