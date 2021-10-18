import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AccountService } from './account.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private injetor: Injector,
  ) { }

    intercept(req, next) {
      let accountService = this.injetor.get(AccountService)
      let tokenizedReq = req.clone({
        setHeaders : {
        Authorization: `Bearer ${accountService.getToken()}`
        }
      })
      return next.handle(tokenizedReq)
    }

}
