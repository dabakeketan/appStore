import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { categoriesArr, headerTexts, productsArr } from 'src/app/constants';
import { StoreService } from '../../services/store.service';
import { takeWhile } from 'rxjs';
import { AppDataModel } from '../../models/storeModel';

@Component({
  selector: 'app-store-main',
  templateUrl: './store-main.component.html',
  styleUrls: ['./store-main.component.scss']
})
export class StoreMainComponent implements OnInit, OnDestroy {

  spotlightApps: Array<AppDataModel> = [];

  allApps: Array<AppDataModel> = [];

  carouselDataAvailable: any = [];

  carouselDataEnable:any = [];

  customOptions: OwlOptions = {};

  headerTexts = headerTexts;

  categoriesArr = categoriesArr;
  
  productsArr = productsArr;

  destroySubscription = false;

  constructor(private router: Router, private storeService: StoreService) {
    this.customOptions = {
      margin: 20,
      autoWidth: true,
      autoplay: true,
      rewind: true,
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 6
        }
      },
      nav: false
    }
  }

  ngOnInit(): void {
    this.storeService.spotlightApps.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.spotlightApps = response;
      }
    });
    this.storeService.allApps.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.allApps = response;
      }
    });
    this.storeService.getSpotlightApps();
    this.storeService.getAllApps();
    // this.carouselData = [
    //   {
    //     id: 1,
    //     img: "assets/img/270-180/app1.jpg",
    //     name: 'Application A'
    //   },
    //   {
    //     id: 2,
    //     img: "assets/img/270-180/app2.jpg",
    //     name: 'Application B'
    //   },
    //   {
    //     id: 3,
    //     img: "assets/img/270-180/app3.jpg",
    //     name: 'Application C'
    //   },
    //   {
    //     id: 4,
    //     img: "assets/img/270-180/app4.jpg",
    //     name: 'Application D'
    //   },
    //   {
    //     id: 5,
    //     img: "assets/img/270-180/app5.jpg",
    //     name: 'Application E'
    //   },
    //   {
    //     id: 6,
    //     img: "assets/img/270-180/app6.jpg",
    //     name: 'Application F'
    //   },
    // ];

    this.carouselDataAvailable = [
      {
        id: 1,
        img: "assets/img/availableApps/logos/CallCabinet.png",
        name: 'CallCabinet',
        desc: 'Lorem Ipsum Text Emar'
      },
      {
        id: 2,
        img: "assets/img/availableApps/logos/iotum.png",
        name: 'Iotum',
        desc: 'Lorem Ipsum Text Emar'
      },
      {
        id: 3,
        img: "assets/img/availableApps/logos/Dubber.png",
        name: 'Dubber',
        desc: 'Lorem Ipsum Text Emar'
      },
      {
        id: 4,
        img: "assets/img/availableApps/logos/TotalCX.png",
        name: 'TotalCX',
        desc: 'Lorem Ipsum Text Emar'
      },
      {
        id: 5,
        img: "assets/img/availableApps/logos/signalmash.png",
        name: 'Signalmash',
        desc: 'Lorem Ipsum Text Emar'
      },
      {
        id: 6,
        img: "assets/img/availableApps/logos/PromptVoice.png",
        name: 'Prompt Voice',
        desc: 'Lorem Ipsum Text Emar'
      },
    ];

    this.carouselDataEnable = [
      {
        id: 1,
        img: "assets/img/enabledApps/logos/TransNexus.png",
        name: 'Trans Nexus',
        desc: 'Lorem Ipsum Text Emar'
      },
      {
        id: 2,
        img: "assets/img/enabledApps/logos/Bandwidth.png",
        name: 'Bandwidth',
        desc: 'Lorem Ipsum Text Emar'
      },
      {
        id: 3,
        img: "assets/img/enabledApps/logos/Go_Integrator_NAVA.png",
        name: 'Go Integrator NAVA',
        desc: 'Lorem Ipsum Text Emar'
      },
      {
        id: 4,
        img: "assets/img/enabledApps/logos/Ozonetel.png",
        name: 'Ozonetel',
        desc: 'Lorem Ipsum Text Emar'
      },
      {
        id: 5,
        img: "assets/img/enabledApps/logos/Pangea.png",
        name: 'Pangea',
        desc: 'Lorem Ipsum Text Emar'
      },
      {
        id: 6,
        img: "assets/img/enabledApps/logos/TeamMate_Technology.png",
        name: 'TeamMate Technology',
        desc: 'Lorem Ipsum Text Emar'
      },
    ];
  }

  goToEnabledApps() {
    this.router.navigateByUrl('store/user');
  }

  goToAvailApps() {
    this.router.navigateByUrl('store/available');
  }

  goToCreatePartner() {
    this.router.navigateByUrl('account/createpartner');
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }

}
