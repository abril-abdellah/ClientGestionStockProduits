import { Injectable } from '@angular/core';
import { TokenStorageService } from "../service/token-storage.service";
import { Router } from "@angular/router";
import { CanActivate } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (!!this.tokenStorageService.getToken()) {
      return true;
    }
    else{
      this.router.navigate(['login']);
      return false;
    }

  }

}
