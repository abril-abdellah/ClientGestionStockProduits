import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { TokenStorageService } from "../service/token-storage.service";

@Injectable({providedIn:'root'})
export class TokenInterceptor implements HttpInterceptor{
  constructor(private tokenStorageService:TokenStorageService){

  }

  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    const authToken = this.tokenStorageService.getToken();
    let outGoingReq = request.clone({headers: request.headers.set('Authorization', 'Bearer '+authToken)});
    return next.handle(outGoingReq);
  }
}
