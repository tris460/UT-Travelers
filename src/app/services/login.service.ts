import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  login: boolean;

  constructor(private router: Router) {
    this.login = false;
  }
  logout() {
    localStorage.removeItem("userUTTraveler");
    this.router.navigate(["home"]);
    window.location.reload();
  }
}
