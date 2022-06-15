import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.component.html',
  styleUrls: ['./admin-info.component.css']
})
export class AdminInfoComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

}
