import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService implements OnDestroy {

  destroySubscription = false;

  constructor(private baseService: BaseService, private router: Router) {

  }

  textComparator = (valueA: any, valueB: any, nodeA: any, nodeB: any) => {
    const valA = valueA ? valueA.toLowerCase() : '';
    const valB = valueB ? valueB.toLowerCase() : '';
    // if (valA === valB) {
    //   return 0;
    // }
    if (!valA) {
      return 1;
    }
    if (!valB) {
      return -1;
    }
    return valA.toLowerCase().localeCompare(valB.toLowerCase());
  }

  numberComparator = (valueA: any, valueB: any, nodeA: any, nodeB: any) => {
    return Number(valueA) - Number(valueB) // valA.toLowerCase().localeCompare(valB.toLowerCase());
  }


  getRequest(reqUrl: string, urlParams?: any) {
    let urlData = '';
    if (urlParams && urlParams.length) {
      urlParams.forEach((val: any) => {
        urlData += '&' + val.paramLabel + '=' + val.paramValue
      });
    }
    return this.baseService.getData(reqUrl + (urlData ? urlData : ''));
  }

  getRequestA(reqUrl: string, urlParams?: any) {
    let urlData = '';
    if (urlParams && urlParams.length) {
      urlParams.forEach((val: any) => {
        urlData += '&' + val.paramLabel + '=' + val.paramValue
      });
    }
    return this.baseService.getDataA(reqUrl + (urlData ? urlData : ''));
  }

  postRequest(reqObj: any, reqUrl: string, urlParams?: any) {
    let urlData = '';
    if (urlParams && urlParams.length) {
      urlParams.forEach((val: any) => {
        urlData += '&' + val.paramLabel + '=' + val.paramValue
      });
    }
    return this.baseService.postData(reqObj, reqUrl + (urlData ? urlData : ''));
  }

  deleteRequest(deleteUrl: string, urlParams?: any, empId?: any) {
    let urlData = '';
    if (urlParams && urlParams.length) {
      urlParams.forEach((val: any) => {
        urlData += '&' + val.paramLabel + '=' + val.paramValue
      });
    }
    return this.baseService.deleteRequest(deleteUrl + (urlData ? urlData : ''));
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }
}
