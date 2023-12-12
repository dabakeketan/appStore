import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiersListComponent } from './tiers-list.component';

describe('TiersListComponent', () => {
  let component: TiersListComponent;
  let fixture: ComponentFixture<TiersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
