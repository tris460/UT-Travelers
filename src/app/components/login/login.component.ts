import { Component, OnInit } from '@angular/core';
import { ApiUserService } from 'src/app/services/api-user.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  date = new Date();
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
  constructor(private apiUserService: ApiUserService, private router: Router, private LoginService: LoginService) {
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
      const CORRECT_USER = this.users.filter(u => // If the credential are saved in the BD
      u.strEmail === this.loginEmail && u.strPassword === this.loginPassword);

      if (CORRECT_USER.length > 0) {
       this.redirectUser(CORRECT_USER[0]);
      } else {
        alert("Incorrect credentials");
      }
    }, 500);
  }
  newUser() {
    let fieldsVerified = this.verifyFields();
    if(!fieldsVerified) {
      alert('Complete the fields correctly');
      return;
    }
    const NEW_USER = {
      boolStatus: true,
      strRol: 'user',
      arrPrograms: [],
      strEmail: this.registerEmail,
      strPassword: this.registerPassword,
      strName: this.registerName,
      strLastName: this.registerLastName,
      dateBirth: this.registerBirthday,
      strPhone: this.registerPhone,
      strCareer: this.registerCareer,
      strPhoto: "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo="
    }
    this.apiUserService.newUser(NEW_USER);
    setTimeout(() => {
      this.redirectUser(NEW_USER);
    }, 600);
  }
  verifyFields() {
    if (this.registerEmail !== ''
      && this.registerPassword !== ''
      && this.registerName !== ''
      && this.registerLastName !== ''
      && this.registerPhone !== ''
      && this.registerCareer !== '') {
        return true;
      } else {
        return false;
      }
  }
  redirectUser(user: any) {
    const USER_INFO = { // Object to save data in local storage
      rol: user.strRol,
      email: user.strEmail
    };
     // Save login information in local storage
     localStorage.setItem('userUTTraveler', JSON.stringify(USER_INFO));
     switch (user.strRol) {
       case "user":
         this.router.navigate(["user"]);
         break;
       case "admin":
         this.router.navigate(["admin"]);
         break;
       default:
         this.router.navigate(["home"]);
     }
  }
  ngOnInit(): void {
  }

}
