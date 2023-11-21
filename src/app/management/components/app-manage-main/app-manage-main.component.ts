import { Component, OnInit } from '@angular/core';

declare let bootstrap: any;

@Component({
  selector: 'app-app-manage-main',
  templateUrl: './app-manage-main.component.html',
  styleUrls: ['./app-manage-main.component.scss']
})
export class AppManageMainComponent implements OnInit {

  createAppPopup: any;

  constructor() { }

  ngOnInit(): void {
  }

  openPopup() {
    this.createAppPopup = new bootstrap.Modal(document.getElementById("createAppModal"), {});
    this.createAppPopup.show();
  }

}
