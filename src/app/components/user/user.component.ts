import { Component, OnInit } from '@angular/core';
import { ApiUserService } from 'src/app/services/api-user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
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
  showInfo: boolean = false;
  addPrevProgram: boolean = false;
  previousProgram: string = '';
  userImageView = document.getElementById("Profile-Picture") as HTMLImageElement;

  constructor(private apiUserService: ApiUserService) {
    this.emailActualUser = localStorage.getItem("userUTTraveler")
    this.emailActualUser = JSON.parse(this.emailActualUser).email;
    setTimeout(() => {
      this.rolUser = localStorage.getItem("userUTTraveler");
      this.rolUser = JSON.parse(this.rolUser);
      this.rolUser = this.rolUser.rol;
      this.users = apiUserService.information;
      this.actualUser = this.users.filter(u =>
        this.emailActualUser == u.strEmail);
      this.userName = `${this.actualUser[0].strName} ${this.actualUser[0].strLastName}`;
      this.career = this.actualUser[0].strCareer;
      this.profilePic = this.actualUser[0].strPhoto;
      this.birthday = this.actualUser[0].dateBirth.slice(0,10);
      this.phoneNumber = this.actualUser[0].strPhone;
      this.programs = this.actualUser[0].arrPrograms;
    }, 900);
  }
  deleteAccount() { }
  addPreviousProgram() {
    if(this.previousProgram == '') {
      alert("Complete the field to continue.");
      return;
    }
    const u = this.actualUser[0];
    const ID_USER = this.actualUser[0]._id;
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
    this.apiUserService.editUser(ID_USER, NEW_USER);
    this.previousProgram = '';
  }

  ngOnInit(): void {
  }

}
