import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { headerTexts, categoriesArr, productsArr } from 'src/app/constants';

@Component({
  selector: 'app-enabled-apps',
  templateUrl: './enabled-apps.component.html',
  styleUrls: ['./enabled-apps.component.scss']
})
export class EnabledAppsComponent implements OnInit {

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
