import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselAppsComponent } from './carousel-apps.component';

describe('CarouselAppsComponent', () => {
  let component: CarouselAppsComponent;
  let fixture: ComponentFixture<CarouselAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselAppsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
