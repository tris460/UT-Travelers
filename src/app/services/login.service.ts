import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  login: boolean;
  rolUser: string;

  constructor() {
    this.login = false;
    this.rolUser = '';
   }
}
