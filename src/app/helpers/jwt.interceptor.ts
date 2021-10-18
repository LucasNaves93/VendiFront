import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AccountService } from '../services/account.service';
import { TokenStorageService } from '../services/token-storage.service';

const TOKEN_HEADER_KEY = 'x-access-token';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    // constructor(private accountService: AccountService) { }

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     // add auth header with jwt if user is logged in and request is to the api url
    //     const user = this.accountService.userValue;
    //     const isLoggedIn = user && user.token;
    //     const isApiUrl = request.url.startsWith(environment.apiUrL);
    //     if (isLoggedIn && isApiUrl) {
    //         request = request.clone({
    //             setHeaders: {
    //                 Authorization: `Bearer ${user.token}`
    //             }
    //         });
    //     }

    //     return next.handle(request);
    // }
    


    constructor(private token: TokenStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
];
