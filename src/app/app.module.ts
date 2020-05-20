import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { ProduitComponent } from './produit/produit.component';
import { Produit } from "./shared/Produit";
import { ProduitMockService } from "./produit/produit.mock.service";
import { NgxPopper } from 'angular-popper';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProduitService } from "./service/produit.service";
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    ProduitComponent,
    NavbarComponent,
    ContentComponent,
    DashboardComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    NgxPopper,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ProduitMockService,
    ProduitService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
