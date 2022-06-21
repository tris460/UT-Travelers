import { Component, OnInit } from '@angular/core';
import { ApiExperiencesService } from 'src/app/services/api-experiences.service';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {
  experiencesList: Array<any> = [];

  constructor(private apiExperiencesService: ApiExperiencesService) {
    setTimeout(() => {
      this.experiencesList = apiExperiencesService.experiences;
    }, 1000);
  }
  getContactInformation(index: number) {
    if (localStorage.getItem("userUTTraveler") === null) {
      alert("You have to log in to see the contact information.");
    } else {
      const USER_SELECTED = this.experiencesList[index];
      alert(`Email: ${USER_SELECTED.strEmail}\nPhone: ${USER_SELECTED.strPhone}`);
    }
  }
  ngOnInit(): void {
  }

}
