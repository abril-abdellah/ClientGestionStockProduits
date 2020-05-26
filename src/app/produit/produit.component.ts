import { Component, OnInit } from '@angular/core';
import { ProduitService } from "../service/produit.service";
import { Produit } from "../shared/Produit";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  //Declaration des variables

  produits: Produit[];
  produitForm: FormGroup;
  operation:string = 'add';
  operationMsg:string='Ajouter un produit';
  selectedProduit:Produit;

  //Le constracteur
  constructor(
    private produitService: ProduitService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
   }

  //Les méthodes
  ngOnInit(): void {
    this.initSelectedProduit();
    this.getAllProduits();
    //this.produits = this.route.snapshot.data.produits;
  }

  getAllProduits(){
    this.produitService.getAllProduits().subscribe(
      data => {this.produits = data},
      error => {console.log("an error was occured while getting produits data")},
      () => {console.log("Loading produits was done")}
    );
  }
  //Ajouter un produit
  addProduit(){
    const produit = this.produitService.addProduit(this.produitForm.value).subscribe(
      res => {
              this.getAllProduits();
              this.initSelectedProduit();
      },
      error => console.log("an error was occured while adding produit"),
      () => console.log("Adding produit was done")
    );
  }
  updateProduit(){
    let produit: Produit = new Produit(this.selectedProduit.id, this.getRefCtrl().value, this.getQuantiteCtrl().value, this.getPrixUnitaireCtl().value);
    this.produitService.updateProduit(produit).subscribe(
      res => {
              this.getAllProduits();
              this.initSelectedProduit();
              },
    );
  }
  deleteProduit(){
    this.produitService.deleteProduit(this.selectedProduit.id).subscribe(
      res => {
              this.selectedProduit=new Produit();
              this.getAllProduits();
              },

    );
  }
  //operation message
  setOperationType(operation:string){
    switch (operation) {
      case 'add':
        this.operationMsg='Ajouter un produit';
        this.operation='add';
        break;
      case 'update':
        this.operationMsg='Modifier le produit';
        this.operation='update';
        console.log(this.selectedProduit.ref)
        break;
      case 'delete':
        this.operationMsg='Supprimer le produit';
        this.operation='delete';
        console.log(this.selectedProduit.ref)
        break;
    }
  }
  doOperation(){
    if(this.operation == 'add')
      this.addProduit();
    else if(this.operation == 'update')
      this.updateProduit();
  }

  initSelectedProduit(){
    this.selectedProduit = new Produit();
    this.createForm();
  }
  createForm(){
    this.produitForm = this.formBuilder.group({
      ref: ['', Validators.required],
      quantite: [''],
      prixUnitaire:['']
    });
  }
  //Methodes de return les form-controls
  getRefCtrl(){
    return this.produitForm.get('ref');
  }
  getQuantiteCtrl(){
    return this.produitForm.get('quantite');
  }
  getPrixUnitaireCtl(){
    return this.produitForm.get('prixUnitaire');
  }
  setCtrlValue(){
    this.getRefCtrl().setValue(this.selectedProduit.ref);
    this.getQuantiteCtrl().setValue(this.selectedProduit.quantite);
    this.getPrixUnitaireCtl().setValue(this.selectedProduit.prixUnitaire);
  }
}
