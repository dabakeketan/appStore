import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMngComponent } from './header-mng.component';

describe('HeaderMngComponent', () => {
  let component: HeaderMngComponent;
  let fixture: ComponentFixture<HeaderMngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderMngComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
