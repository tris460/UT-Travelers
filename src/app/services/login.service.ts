import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  login: boolean;

  constructor(private router: Router) {
    this.login = false; // Variable that indicates if the user could log in
  }
  /**
   * This function removes an element from the local storage, then, redirect
   * the user to the main page and reload the page to recharge all the
   * elements correctly.
   */
  logout() {
    localStorage.removeItem("userUTTraveler");
    this.router.navigate(["home"]);
    window.location.reload();
  }
}
