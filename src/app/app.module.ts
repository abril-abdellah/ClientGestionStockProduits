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
import { LoginComponent } from './login/login.component';
import { AuthService } from "./service/auth.service";
import { TokenStorageService } from "./service/token-storage.service";
import { TokenInterceptor } from "./interceptor/token.interceptor";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthGuardService } from "./service/auth-guard.service";
import { NgChartjsModule } from 'ng-chartjs';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    ProduitComponent,
    NavbarComponent,
    ContentComponent,
    DashboardComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    NgxPopper,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgChartjsModule,
    ChartsModule
  ],
  providers: [
    ProduitMockService,
    ProduitService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
