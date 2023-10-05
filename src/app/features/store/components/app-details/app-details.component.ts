import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { categoriesArr, headerTexts } from 'src/app/constants';
import { StoreService } from '../../services/store.service';
import { takeWhile } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.scss']
})
export class AppDetailsComponent implements OnInit, OnDestroy {

  headerTexts = headerTexts;

  categoriesArr = categoriesArr;

  imagePath: any;

  destroySubscription = false;

  constructor(private router: Router, private storeService: StoreService,
    private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.storeService.getAppDetails();
    this.storeService.appDetailsSubject.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        if (response) {
          this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' 
                 + response.app_icon);
        } 
      }
    });
  }

  goBack() {
    this.router.navigateByUrl('store/home');
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }
}
