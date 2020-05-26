import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "../service/token-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin = false;
  roles: [] = [];

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenStorageService.isAdmin()) {
      this.isAdmin = true;
    }
  }

  seDeconnecter() {
    this.tokenStorageService.signOut();
  }
}
