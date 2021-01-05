import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.auth.user)
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.user.token}`
      }
    });
    return next.handle(request);
  }
}