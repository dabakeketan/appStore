import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ManagementService } from 'src/app/management/services/management.service';

@Injectable()
export class MngAppAuthGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router, private managementService: ManagementService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.managementService.getMngToken();
        if (token) {
            this.managementService.isMngLoggedIn.next(true);
            return true;
        } else {
           this.router.navigate(['/manage']);
            return false;
        }
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }

}
