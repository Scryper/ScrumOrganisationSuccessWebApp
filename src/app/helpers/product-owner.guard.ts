import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../services";

@Injectable({
  providedIn: 'root'
})
export class ProductOwnerGuard implements CanActivate {
    constructor(private router: Router,
                private authenticationService: AuthenticationService) {
    }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
        const currentUser = this.authenticationService.currentUserValue;

        //if it is a productOwner
        if(currentUser.role==1){
            return true;
        }


    return true;
  }

}
