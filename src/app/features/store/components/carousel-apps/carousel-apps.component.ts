import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel-apps',
  templateUrl: './carousel-apps.component.html',
  styleUrls: ['./carousel-apps.component.scss']
})
export class CarouselAppsComponent implements OnInit {

  @Input() carouselData: any;

  @Input() customOptions: OwlOptions = {};

  @Input() isEnable: Boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToDetails(app_id: any) {
      this.router.navigateByUrl('/store/app/' + app_id);
  }

}
