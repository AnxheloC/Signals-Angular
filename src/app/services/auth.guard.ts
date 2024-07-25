import {ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";


export const userAuthentificate :CanActivateFn =
(route:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>{


  const authService=inject(AuthService);
  const router =inject(Router);
  if(authService.isLoggedIn()){
    return true;
  }
  else {
   return  router.parseUrl('/login');
  }
}

