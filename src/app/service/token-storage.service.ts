import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  saveToken(token) {
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  signOut() {
    sessionStorage.clear();
    window.location.reload();
  }

  isAdmin(): boolean {
    if (this.getToken() != null) {
      if (this.getUser().roles.includes('ROLE_ADMIN')) {
        return true;
      }
    }
    return false;
  }

}
