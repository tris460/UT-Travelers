import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  rolUser: string;

  constructor(private loginService: LoginService) {
    this.rolUser = loginService.rolUser;
   }

  ngOnInit(): void {
  }

}
