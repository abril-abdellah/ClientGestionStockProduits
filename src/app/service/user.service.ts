import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_URLS } from "../config/api.url.config";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers() {
    return this.http.get(API_URLS.UTILISATEURS_URL);
  }
  addUser(user) {
    return this.http.post(API_URLS.SINSCRIRE_URL, user);
  }
  updateUser(user) {
    return this.http.put(API_URLS.UTILISATEUR_URL, user);
  }
  deleteUser(id) {
    return this.http.delete(API_URLS.UTILISATEUR_URL+'/'+id);
  }
}
