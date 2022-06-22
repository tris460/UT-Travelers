import { Component, OnInit } from '@angular/core';
import { ApiUserService } from 'src/app/services/api-user.service';
import { Router } from '@angular/router';
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
  constructor(private apiUserService: ApiUserService, private router: Router) {
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
        const USER_INFO = { // Object to save data in local storage
          rol: CORRECT_USER[0].strRol,
          email: CORRECT_USER[0].strEmail
        };
        // Save login information in local storage
        localStorage.setItem('userUTTraveler', JSON.stringify(USER_INFO));
        switch (CORRECT_USER[0].strRol) {
          case "user":
            this.router.navigate(["user"]);
            break;
          case "admin":
            this.router.navigate(["admin"]);
            break;
          default:
            this.router.navigate(["home"]);
        }
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
      strEmail: this.registerEmail,
      strPassword: this.registerPassword,
      strName: this.registerName,
      strLastName: this.registerLastName,
      dateBirth: this.registerBirthday,
      strPhone: this.registerPhone,
      strCareer: this.registerCareer,
      strPhoto: "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=20&m=922962354&s=612x612&w=0&h=f-9tPXlFXtz9vg_-WonCXKCdBuPUevOBkp3DQ-i0xqo="
    }
    console.log(NEW_USER)
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
  ngOnInit(): void {
  }

}
