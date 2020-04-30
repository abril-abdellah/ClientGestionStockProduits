import { Produit } from "../shared/Produit";
import { Injectable } from "@angular/core";

@Injectable()
export class ProduitMockService {
   private PRODUITS: Produit[] = [
     {ref: 'Livre', quantite: 15, prixUnitaire: 90.70},
     {ref: 'Pc', quantite: 7,  prixUnitaire: 7500},
     {ref: 'Pantalon', quantite: 44,  prixUnitaire: 170.66}
   ];

  constructor() {
  }

  getProduits(){
    return this.PRODUITS;
  }
}
