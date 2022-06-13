import { Component, OnInit } from '@angular/core';
import { ApiUserService } from 'src/app/services/api-user.service';

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
  users: Array<any>;
  constructor(private apiUserService: ApiUserService) {
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
    this.users = [];
  }

  login() {
    setTimeout(() => {
      this.users = this.apiUserService.information;
      console.log(this.users);
    }, 500);
  }
  ngOnInit(): void {
  }

}
