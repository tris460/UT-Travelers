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
  ID_USER: any;
  rolUser: any = '';
  users: Array<any> = [];
  actualUser: any;
  emailActualUser: any;
  userName: string = '';
  career: string = '';
  profilePic: string = '';
  birthday: any;
  phoneNumber: string = '';
  programs: Array<any> = [];
  password: string = '';
  showInfo: boolean = false;
  addPrevProgram: boolean = false;
  previousProgram: string = '';
  deleteUser: boolean = false;
  confirmDelete: string = '';
  forumQuestions: Array<any> = [];
  showQuestions: boolean = false;
  photo: string = '';
  userImageView = document.getElementById("Profile-Picture") as HTMLImageElement;

  constructor(private apiUserService: ApiUserService,private router: Router, private LoginService: LoginService, private ApiForumService: ApiForumService) {
    this.emailActualUser = localStorage.getItem("userUTTraveler")
    this.emailActualUser = JSON.parse(this.emailActualUser).email;
    setTimeout(() => {
      this.rolUser = localStorage.getItem("userUTTraveler");
      this.rolUser = JSON.parse(this.rolUser);
      this.rolUser = this.rolUser.rol;
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
    }, 900);
  }
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
  ngOnInit(): void {
  }

}
