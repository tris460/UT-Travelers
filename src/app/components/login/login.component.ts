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
  /**
   * This function verifies if an email and password exist in the DB
   * and are from the same user, if they do, the user is redirected
   * to the main page, if not, an alert appears.
   */
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
  /**
   * This function creates a new user if the function verifyFields()
   * returns true, after that, the new user is saved in the DB and
   * the user is redirected to the main page.
   * @returns Anything if the user didn't complete the fields
   */
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
      strPhoto: "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-hay-icono-de-imagen-disponible-ilustraci%C3%B3n-vectorial-plana.jpg?ver=6"
    }
    this.apiUserService.newUser(NEW_USER);
    setTimeout(() => {
      this.redirectUser(NEW_USER);
    }, 600);
  }
  /**
   * This function verifies if the user filled all the fields in the form.
   * @returns True if the user completed the fields correctly, false if not
   */
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
