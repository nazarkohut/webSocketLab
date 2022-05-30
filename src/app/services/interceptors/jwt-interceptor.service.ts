import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from "ngx-cookie-service";
import {ChatSupportService} from "../chat-support.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private chat: ChatSupportService, private cookie: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const username = this.cookie.get('username');
    const password = this.cookie.get('password');
    let token = this.cookie.get('token')
    if (!token){
       token  = this.chat.SDK.getUserToken(username, password)
      this.cookie.set('token', token);
    }
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }
    return next.handle(request);
  }


}
