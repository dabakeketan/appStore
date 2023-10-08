import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/services/account.service';

@Injectable()
export class AppAuthGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router, private accountService: AccountService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const isAuthenticated = this.accountService.isAuthenticated();
        // console.log('token at guard', token);
        const user = this.accountService.getUser();
        if (user) {
            return true;
        } else {
           this.router.navigate(['/dashboard/main']);
            return false;
        }
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }

}
