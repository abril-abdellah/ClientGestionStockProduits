import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";
import { TokenStorageService } from "../service/token-storage.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (!!this.tokenStorageService.getToken() && this.tokenStorageService.isAdmin()) {
      return true;
    }
    else {
      this.router.navigate(['dashboard']);
      return false;
    }
  }

}
