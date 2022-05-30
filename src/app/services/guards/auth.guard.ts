import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CookieService} from "ngx-cookie-service";
import {ChatSupportService} from "../chat-support.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private chat: ChatSupportService, private cookie: CookieService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const username = this.cookie.get("username");
    const password = this.cookie.get("password");
    console.log("username and password", username, password);
    if (!username || !password){
      this.router.navigate(['register']);
      return false;
    }
    return true;
  }

}
