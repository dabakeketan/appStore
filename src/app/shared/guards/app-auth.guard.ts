import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AppAuthGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = 'abcd';
        // const token = this.tokenStorageService.getAuthToken();
        // console.log('token at guard', token);
        if (token) {
            return true;
        } else {
           this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }

}
