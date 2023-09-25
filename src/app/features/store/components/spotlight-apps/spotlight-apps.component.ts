import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spotlight-apps',
  templateUrl: './spotlight-apps.component.html',
  styleUrls: ['./spotlight-apps.component.scss']
})
export class SpotlightAppsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  gotoDetails() {
    this.router.navigateByUrl('store/details');
  }
}
