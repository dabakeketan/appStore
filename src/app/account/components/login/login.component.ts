import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { LoginModel } from '../../models/accountModel';
import { RegExPatterns, errorMsgs } from 'src/app/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel;

  errorMsgs = errorMsgs;

  regExPatterns = RegExPatterns;

  constructor(private accountService: AccountService) { 
    this.loginModel = {
      shortname: '',
    }
  }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.loginModel.shortname);
  }

  goHome() {
    this.accountService.goHome();
  }

}
