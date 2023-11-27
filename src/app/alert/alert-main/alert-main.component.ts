import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AlertService } from '../services/alert.service';
import { takeWhile } from 'rxjs';

@Component({
  selector: 'app-alert-main',
  templateUrl: './alert-main.component.html',
  styleUrls: ['./alert-main.component.scss']
})
export class AlertMainComponent implements OnInit, OnDestroy {

  swalOptions: any;

  destroySubscription = false;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.alertSubject.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        if (response) {
          // console.log('yeesss');
          if(response.type && response.type === 'error') {
            this.error(response.type, response.text);
          } else if(response.type && response.type === 'success') {
            this.success(response.type, response.text);
          }
        } 
      }
    });
  }

  error(type: any, text: any) {
    Swal.fire({
      icon: 'error',
      text: text,
      confirmButtonColor: '#2dce89'
    })
  }

  success(type: any, text: any) {
    Swal.fire({
      icon: 'success',
      text: text,
      confirmButtonColor: '#2dce89'
    })
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }

}
