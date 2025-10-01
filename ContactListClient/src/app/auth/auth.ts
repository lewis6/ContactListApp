import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userKey = 'username';

  login(username: string) {
    localStorage.setItem(this.userKey, username);
  }

  logout() {
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.userKey) !== null;
  }

  getUsername(): string | null {
    return localStorage.getItem(this.userKey);
  }
}
