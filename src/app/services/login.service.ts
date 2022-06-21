import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  login: boolean;
  rolUser: string;

  constructor(private router: Router) {
    this.login = false;
    this.rolUser = '';
  }
  logout() {
    localStorage.removeItem("userUTTraveler");
    this.router.navigate(["home"]);
    window.location.reload();
  }
}
