import { Component, OnInit } from '@angular/core';
import { ApiExperiencesService } from 'src/app/services/api-experiences.service';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {
  experiencesList: Array<any> = [];
  experienceStart: number = 0;
  experienceEnd: number = 0;
  experiencesLength: number = 0;
  experiencesListShown: Array<any> = [];

  constructor(private apiExperiencesService: ApiExperiencesService) {
    setTimeout(() => {
      this.experiencesList = apiExperiencesService.experiences;
      this.experiencesLength = this.experiencesList.length;
      if(this.experiencesLength >= 3) {
        this.experienceEnd = 3;
        this.experiencesListShown = this.experiencesList.slice(0,this.experienceEnd);
      } else {
        this.experienceEnd = this.experiencesLength;
        this.experiencesListShown = this.experiencesList;
      }
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
  showNext() {
    if(this.experienceEnd === this.experiencesLength) this.experienceEnd = 0;
    this.experienceStart += 3;
    this.experienceEnd += 3;
    if(this.experienceStart > this.experiencesLength) this.experienceStart = 0;
    if(this.experienceEnd > this.experiencesLength) this.experienceEnd = this.experiencesLength;
    this.experiencesListShown = [];
    this.experiencesListShown = this.experiencesList.slice(this.experienceStart, this.experienceEnd);
  }
  ngOnInit(): void {
  }

}
