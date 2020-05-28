import { Component, OnInit } from '@angular/core';
import { Produit } from "../shared/Produit";
import { ProduitService } from "../service/produit.service";
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  produits = [];
  chartReady: boolean = false;
  quantiteData: number[] = [];
  prixUnitaireData: number[] = [];
  chartLabels = [];
  noData: boolean = true;

  produitsData = [
    { data: this.quantiteData, label: 'Quantité' }
  ];
  produitPrixData = [
    { data: this.prixUnitaireData, label: 'Prix unitaire' }
  ];
  chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  chartData = this.produitsData;
  chartData_prix = this.produitPrixData;
  constructor(
    private produitService: ProduitService
  ) { }

  ngOnInit(): void {
    this.getAllProduits();
  }

  getAllProduits() {
    this.produitService.getAllProduits().subscribe(
      data => {
        this.produits = data;
        if (this.produits.length != 0) this.noData = false;
        else this.noData = true;
        this.produits.forEach(p => {
          this.quantiteData.push(p.quantite);
          this.prixUnitaireData.push(p.prixUnitaire);
          this.chartLabels.push(p.ref);
        });
      },
      error => console.log(error),
      () => this.chartReady = true
    );
  }


}
