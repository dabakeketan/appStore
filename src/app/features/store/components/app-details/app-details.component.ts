import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIUrls, MNGUrls, categoriesArr, headerTexts } from 'src/app/constants';
import { StoreService } from '../../services/store.service';
import { forkJoin, takeWhile } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { AppDataModel, CustomerEnabledUsersDataModel, CustomerUsersDataModel } from '../../models/storeModel';
import { PartnerDataModel } from 'src/app/account/models/accountModel';
import { AccountService } from 'src/app/account/services/account.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

declare let bootstrap: any;

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.scss']
})
export class AppDetailsComponent implements OnInit, OnDestroy {

  headerTexts = headerTexts;

  categoriesArr = categoriesArr;

  destroySubscription = false;

  app_Id: any;

  appDetailsData: AppDataModel;

  isAppEnabled = false;

  user: PartnerDataModel;

  isCustomerUser = false;

  manageUsersPopup: any;

  allUsersPopup: any;

  anyChange = false;

  allUsersSearchText = '';

  allUsersconfigOptionsOnChanges = {
    isClearSelection: false
  }

  customerUsers: Array<CustomerUsersDataModel> = [];

  selectedUsers = [];

  anyChangeA = false;

  enabledUsersSearchText = '';

  enabledUsersconfigOptionsOnChanges = {
    isClearSelection: false,
    user_mgmt_enabled: false,
    user_tiers_enabled: false
  }

  customerEnabledUsers: Array<CustomerEnabledUsersDataModel> = [];

  selectedEnabledUsers = [];

  tiersArr = ['Disabled'];

  defaultTierConfigValue = '';

  constructor(private router: Router, private route: ActivatedRoute, private storeService: StoreService,
    private accountService: AccountService) {
    this.app_Id = String(this.route.snapshot.paramMap.get('id'));
    this.user = this.accountService.getUser();
    if (this.user) {
      if (this.user.customer_name) {
        this.isCustomerUser = true;
      } else {
        this.isCustomerUser = false;
      }
    }
  }

  ngOnInit(): void {
    if (this.user) {
      this.appInit();
    } else {
      this.appInitA();
    }

  }

  appInit() {
    this.subscriptions();
    const response = this.storeService.getRequest(MNGUrls.appBase + '/' + this.app_Id);
    let checkEnableUrl = APIUrls.partnerApps + this.user.partner_id;
    if (this.isCustomerUser) {
      checkEnableUrl = checkEnableUrl + '/customer/' + this.user.customer_name +
        '/app/' + this.app_Id + '/check-enabled';
    } else {
      checkEnableUrl = checkEnableUrl + '/app/' + this.app_Id + '/check-enabled'
    }
    const responseA = this.storeService.getRequest(checkEnableUrl);
    forkJoin([response, responseA])
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe((forkResponse: any) => {
        if (forkResponse && forkResponse.length) {
          if (forkResponse[0] && forkResponse[0].status === 200 && forkResponse[0].body) {
            this.appDetailsData = forkResponse[0].body;
            this.enabledUsersconfigOptionsOnChanges = {
              isClearSelection: false,
              user_mgmt_enabled: this.appDetailsData.user_mgmt_enabled,
              user_tiers_enabled: false
            }
            if (this.appDetailsData && this.appDetailsData.user_mgmt_enabled && this.isCustomerUser) {
              this.storeService.getCustomerUsers(this.appDetailsData.app_id, this.user);
              this.storeService.getCustomerUserConfigs(this.appDetailsData.app_id, this.user);
            }
            if (this.appDetailsData && this.appDetailsData.user_mgmt_enabled && this.appDetailsData.user_tiers_enabled
              && this.isCustomerUser) {
              this.storeService.getAppTiers(this.appDetailsData.app_id);
            }
          }
          if (forkResponse[1] && forkResponse[1].status === 200 && forkResponse[1].body) {
            console.log(forkResponse[1].body);
            const res = forkResponse[1].body;
            if (res && res.message && res.message === 'False') {
              this.isAppEnabled = false;
            } else if (res && res.message && res.message === 'True') {
              this.isAppEnabled = true;
            }

          }
        }
      });


  }

  appInitA() {
    this.storeService.getRequest(MNGUrls.appBase + '/' + this.app_Id)
      .pipe(takeWhile(() => !this.destroySubscription)).subscribe({
        next: (response: any) => {
          if (response && response.status === 200) {
            console.log('app details', response.body);
            this.appDetailsData = response.body;
          }
        }
      });
  }

  subscriptions() {
    this.storeService.customerUsersDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.customerUsers = response;
      }
    });

    this.storeService.customerEnabledUsersDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.customerEnabledUsers = response;
        if (this.appDetailsData.user_mgmt_enabled && !this.appDetailsData.user_tiers_enabled) {
          this.customerEnabledUsers.forEach(item => {
            item.status = true;
          })
        }
      }
    });

    this.storeService.tiersArrDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        if (response && response.length) {
          response.forEach((element: any) => {
            this.tiersArr.push(element);
          });
          this.defaultTierConfigValue = this.tiersArr[1];
          this.enabledUsersconfigOptionsOnChanges = {
            isClearSelection: false,
            user_mgmt_enabled: this.appDetailsData.user_mgmt_enabled,
            user_tiers_enabled: this.appDetailsData.user_tiers_enabled,
          }
        }
      }
    });

    this.storeService.updateUsersDataSub.pipe(takeWhile(() => !this.destroySubscription)).subscribe({
      next: (response: any) => {
        this.handleEnableUsers();
      }
    });
  }

  handleEnableUsers() {
    this.manageUsersPopup.hide();
    Swal.fire({
      title: "Success",
      icon: "success",
      confirmButtonColor: "#2dce89",
      confirmButtonText: "Ok"
    }).then((result) => {
      if (result.isConfirmed) {
        this.storeService.getCustomerUsers(this.appDetailsData.app_id, this.user);
        this.storeService.getCustomerUserConfigs(this.appDetailsData.app_id, this.user);
      }
    });
  }

  disableApp() {
    this.storeService.disableApp(this.isCustomerUser, this.appDetailsData, this.user);
  }

  enableApp() {
    this.storeService.enableApp(this.isCustomerUser, this.appDetailsData, this.user);
  }

  manageUsers() {
    console.log('user mngm on');
    this.openManageUsersPopup();
    if(this.tiersArr && this.tiersArr.length) {
      this.defaultTierConfigValue = this.tiersArr[1];
    }
  }

  openManageUsersPopup() {
    this.manageUsersPopup = new bootstrap.Modal(document.getElementById("manageUsersPopup"), {
      backdrop: 'static', keyboard: false
    });
    this.manageUsersPopup.show();
    this.anyChangeA = true;
  }

  openAllUsersPopup() {
    this.allUsersPopup = new bootstrap.Modal(document.getElementById("allUsersPopup"), {
      backdrop: 'static', keyboard: false
    });
    this.allUsersPopup.show();
    this.anyChange = true;
  }

  customerUsersSelectedEvent(event: any) {
    console.log('abcd selected users', event);
    this.selectedUsers = event;
  }


  cancelAllUsersPopup() {
    this.allUsersconfigOptionsOnChanges = {
      isClearSelection: true
    }
  }

  customerEnabledUsersSelectedEvent(event: any) {
    console.log('abcd selected enabled users', event);
    this.selectedEnabledUsers = event;
  }


  addToEnableUsers() {
    if (this.appDetailsData.user_mgmt_enabled && this.appDetailsData.user_tiers_enabled) {
      this.selectedUsers.forEach((user: any) => {
        const tempObj = {
          config_name: this.appDetailsData.ns_config_name,
          config_value: this.defaultTierConfigValue,
          domain: this.user.customer_name,
          user: user.user,
          status: false
        };
        this.customerEnabledUsers.push(tempObj);
      });
      this.customerEnabledUsers = [...this.customerEnabledUsers];
      this.cancelAllUsersPopup();
      this.allUsersPopup.hide();
    } else if (this.appDetailsData.user_mgmt_enabled && !this.appDetailsData.user_tiers_enabled) {
      this.selectedUsers.forEach((user: any) => {
        const tempObj = {
          config_name: this.appDetailsData.ns_config_name,
          config_value: '1',
          domain: this.user.customer_name,
          user: user.user,
          status: true
        };
        this.customerEnabledUsers.push(tempObj);
      });
      this.customerEnabledUsers = [...this.customerEnabledUsers];
      this.allUsersPopup.hide();
    }
  }

  enableDisableUsers() {
    if (this.customerEnabledUsers.length) {
      console.log('abcd enabaled users', this.customerEnabledUsers);
      this.storeService.enableDisableUsers(this.customerEnabledUsers, this.user, this.appDetailsData);
    }
  }

  disableWithUsers() {
    if (this.customerEnabledUsers.length) {
      this.storeService.disableWithUsers(this.customerEnabledUsers, this.user, this.appDetailsData);
    }
  }

  goBack() {
    this.accountService.goHome();
  }

  ngOnDestroy(): void {
    this.destroySubscription = true;
  }
}
