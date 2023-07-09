import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class playerGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (JSON.parse(this.cookieService.get('userData') || '{}').user?.role === "player") {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
