import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduitComponent } from './produit/produit.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ProduitResolver } from './resolver/produit.resolver'
import { UserComponent } from "./user/user.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuardService } from "./service/auth-guard.service";
import { RoleGuardService } from "./service/role-guard.service";

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },//Default
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'produit', component: ProduitComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'utilisateur', component: UserComponent, canActivate: [RoleGuardService] },
  { path: '**', redirectTo: '/dashboard' },//NotFound
  //{ path: '**', component: DashboardComponent}


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ProduitResolver]
})
export class AppRoutingModule {

}
