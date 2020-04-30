import { Component, OnInit } from '@angular/core';
import { ProduitMockService } from "./produit.mock.service";
import { Produit } from "../shared/Produit";

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  produits: Produit[];
  constructor(private produitMockService: ProduitMockService) { }

  ngOnInit(): void {
    this.produits = this.produitMockService.getProduits();
  }

}
