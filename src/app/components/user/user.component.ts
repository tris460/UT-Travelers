import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiForumService } from 'src/app/services/api-forum.service';
import { ApiUserService } from 'src/app/services/api-user.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class UserComponent implements OnInit {
  ID_USER: any; // Actual ser's ID
  rolUser: any = ''; // User's rol: admin/user
  users: Array<any> = []; // List of the user registered
  actualUser: any; // User logged
  // User's logged information
  emailActualUser: any;
  userName: string = '';
  career: string = '';
  profilePic: string = '';
  birthday: any;
  phoneNumber: string = '';
  programs: Array<any> = [];
  password: string = '';
  photo: string = '';

  showInfo: boolean = false; // Show icon to view more user's information
  addPrevProgram: boolean = false; // Show form to add a program
  previousProgram: string = ''; // New program's name
  deleteUser: boolean = false; // Show the information to delete an account
  confirmDelete: string = ''; // Password confirmation
  forumQuestions: Array<any> = []; // Questions done in the forum
  showQuestions: boolean = false; // If show the questions made by the user
  userImageView = document.getElementById("Profile-Picture") as HTMLImageElement;

  constructor(private apiUserService: ApiUserService,private router: Router, private LoginService: LoginService, private ApiForumService: ApiForumService) {
    this.emailActualUser = localStorage.getItem("userUTTraveler")
    this.rolUser = localStorage.getItem("userUTTraveler");
    if(this.emailActualUser === null) {
      this.emailActualUser = '';
      this.rolUser = '';
    } else {
      this.emailActualUser = JSON.parse(this.emailActualUser).email;
      this.rolUser = JSON.parse(this.rolUser).rol;
      setTimeout(() => {
        this.users = apiUserService.information;
        this.actualUser = this.users.filter(u =>
          this.emailActualUser == u.strEmail);
        this.ID_USER = this.actualUser[0]._id;
        this.userName = `${this.actualUser[0].strName} ${this.actualUser[0].strLastName}`;
        this.career = this.actualUser[0].strCareer;
        this.profilePic = this.actualUser[0].strPhoto;
        this.birthday = this.actualUser[0].dateBirth.slice(0,10);
        this.phoneNumber = this.actualUser[0].strPhone;
        this.programs = this.actualUser[0].arrPrograms;
        this.password = this.actualUser[0].strPassword;
        this.photo = this.actualUser[0].strPhoto;
        this.forumQuestions = ApiForumService.questions.filter((q: { idUser: any; }) =>
          q.idUser === this.ID_USER)
      }, 1000);
    }
  }
  /**
   * This function simulates the deletion of an account updating the
   * account's status from true to false, and the login should
   * show a message saying the account doesn't exist.
   * The user has to write the password to confirm he wants to delete the account.
   */
  deleteAccount() {
    if(this.password === this.confirmDelete) {
      const u = this.actualUser[0];
      const ID_USER = this.actualUser[0]._id;
      const NEW_USER = {
        boolStatus: false,
        strRol: u.strRol,
        strName: u.strName,
        strLastName: u.strLastName,
        dateBirth: u.dateBirth,
        strPhone: u.strPhone,
        strEmail: u.strEmail,
        strPassword: u.strPassword,
        strCareer: u.strCareer,
        strPhoto: u.strPhoto,
        arrPrograms: u.arrPrograms
      }
      this.apiUserService.editUser(ID_USER, NEW_USER);
      alert("Your account has been deleted successfully.");
      setTimeout(() => {
        localStorage.removeItem("userUTTraveler");
        this.router.navigate(["home"]);
      }, 500);
    } else {
      alert("The password is incorrect, try again.");
    }
  }
  /**
   * Saves a previous program in the DB, linking the program's name
   * with the user's ID.
   * To do that, the logged user's account has to be updated.
   * @returns Anything if the user didn't write a word in the input.
   */
  addPreviousProgram() {
    if(this.previousProgram == '') {
      alert("Complete the field to continue.");
      return;
    }
    const u = this.actualUser[0];

    u.arrPrograms.push(this.previousProgram);
    const NEW_USER = {
      boolStatus: u.boolStatus,
      strRol: u.strRol,
      strName: u.strName,
      strLastName: u.strLastName,
      dateBirth: u.dateBirth,
      strPhone: u.strPhone,
      strEmail: u.strEmail,
      strPassword: u.strPassword,
      strCareer: u.strCareer,
      strPhoto: u.strPhoto,
      arrPrograms: u.arrPrograms
    }
    this.apiUserService.editUser(this.ID_USER, NEW_USER);
    this.previousProgram = '';
  }
  ngOnInit(): void { }

}
