import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { headerTexts, categoriesArr, productsArr } from 'src/app/constants';

@Component({
  selector: 'app-available-apps',
  templateUrl: './available-apps.component.html',
  styleUrls: ['./available-apps.component.scss']
})
export class AvailableAppsComponent implements OnInit {

  headerTexts = headerTexts;

  categoriesArr = categoriesArr;
  
  productsArr = productsArr;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  gotoDetails() {
    this.router.navigateByUrl('store/details');
  }

  goBack() {
    this.router.navigateByUrl('store/home');

  }

}