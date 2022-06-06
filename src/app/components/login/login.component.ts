import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginEmail: string;
  loginPassword: string;
  registerEmail: string;
  registerPassword: string;
  registerPasswordConf: string;
  registerName: string;
  registerLastName: string;
  registerBirthday: Date;
  registerPhone: string;
  registerCareer: string;
  constructor() {
    this.loginEmail = '';
    this.loginPassword = '';
    this.registerEmail = '';
    this.registerPassword = '';
    this.registerPasswordConf = '';
    this.registerName = '';
    this.registerLastName = '';
    this.registerBirthday = new Date();
    this.registerPhone = '';
    this.registerCareer = '';

  }

  ngOnInit(): void {
  }

}
