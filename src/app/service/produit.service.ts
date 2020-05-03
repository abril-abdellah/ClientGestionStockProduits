import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_URLS } from "../config/api.url.config";
import { Produit } from "../shared/Produit";

@Injectable()
export class ProduitService{
  constructor(private httpClient: HttpClient){

  }

  getAllProduits(): Observable<any>{
    return this.httpClient.get(API_URLS.PRODUITS_URL);
  }
  addProduit(produit: Produit): Observable<any>{
    console.log(produit);
    return this.httpClient.post(API_URLS.PRODUITS_URL, produit);
  }
  updateProduit(produit: Produit): Observable<any>{
    console.log(produit);
    return this.httpClient.put(API_URLS.PRODUITS_URL, produit);
  }
  deleteProduit(ref: string): Observable<any>{
    //console.log(API_URLS.PRODUITS_URL+'/${ref}');
    return this.httpClient.delete(API_URLS.PRODUITS_URL+'/'+ref);
  }
}
