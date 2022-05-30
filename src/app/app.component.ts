import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UTTravelers';

  login: boolean;
  showInfo: boolean;
  rolUser: string;

  constructor(private loginStatus: LoginService) {
    this.login = loginStatus.login;
    this.rolUser = loginStatus.rolUser;
    this.showInfo = true;
  }
}
