import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { categoriesArr, headerTexts } from 'src/app/constants';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.scss']
})
export class AppDetailsComponent implements OnInit {

  headerTexts = headerTexts;

  categoriesArr = categoriesArr;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigateByUrl('store/home');
  }
}
