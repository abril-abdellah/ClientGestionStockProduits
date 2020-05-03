import { Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { ProduitService } from "../service/produit.service";

@Injectable()
export class ProduitResolver{

  constructor(private produitService: ProduitService){
  }

  resolve(){
    return this.produitService.getAllProduits();
  }
}
