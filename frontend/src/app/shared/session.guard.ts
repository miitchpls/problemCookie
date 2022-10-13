import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    switch (state.url) {
      case '/': {
        if (this.hasActiveSession()) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }
      default:
        if (!this.hasActiveSession()) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
    }
  }

  private hasActiveSession(): boolean {
    if (this.cookieService.get('seed') && this.cookieService.get('state')) {
      return true;
    } else {
      return false;
    }
  }
}
