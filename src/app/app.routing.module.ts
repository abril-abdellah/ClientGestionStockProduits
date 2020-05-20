import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduitComponent } from './produit/produit.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ProduitResolver } from './resolver/produit.resolver'
import { UserComponent } from "./user/user.component";
export const routes : Routes = [
{ path: '', redirectTo:'/dashboard', pathMatch:'full'},//Default
{ path: 'produit', component: ProduitComponent},
{ path: 'dashboard', component: DashboardComponent},
{ path: 'utilisateur', component: UserComponent},
//{ path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ProduitResolver]
})
export class AppRoutingModule {

}
