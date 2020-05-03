import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProduitComponent } from './produit/produit.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ProduitResolver } from './resolver/produit.resolver'

export const routes : Routes = [
{ path: '', redirectTo:'/dashboard', pathMatch:'full'},//Default
{
  path: 'produit',
  resolve: {
    produits: ProduitResolver
  },
  component: ProduitComponent
},
{ path: 'dashboard', component: DashboardComponent},
//{ path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ProduitResolver]
})
export class AppRoutingModule {

}
