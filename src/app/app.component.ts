import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "./service/token-storage.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ClientGestionStockProduits';

  isLoggedin = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ){

  }

  ngOnInit(){
    this.isLoggedin = !!this.tokenStorageService.getToken();
  }
}
