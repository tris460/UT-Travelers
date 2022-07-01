import { Component, OnInit } from '@angular/core';
import { ApiExperiencesService } from 'src/app/services/api-experiences.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})

export class ExperiencesComponent implements OnInit {
  experiencesList: Array<any> = []; // Experiences from the DB
  experienceStart: number = 0; // Experience's index where they start appearing
  experienceEnd: number = 0; // Experience's index where they stop appearing
  experiencesLength: number = 0; // Quantity of experiences registered
  experiencesListShown: Array<any> = []; // Experiences to show in the user's view
  logged: boolean = false; // If the user is logged, he can add it's experience, else, not
  showForm: boolean = false; // In case the user is logged, he can see the form
  newExperience: string = ''; // Text to add with the experience

  constructor(private apiExperiencesService: ApiExperiencesService, private userComponent: UserComponent) {
    if(localStorage.getItem("userUTTraveler") !== null) this.logged = true;
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
  /**
   * This function shows an alert with the user email and phone in case some user
   * wants to access to that information.
   * @param index Index of the experiences' array to show the information of the user who
   * wrote that experience
   */
  getContactInformation(index: number) {
    if (localStorage.getItem("userUTTraveler") === null) {
      alert("You have to log in to see the contact information.");
    } else {
      const USER_SELECTED = this.experiencesList[index];
      alert(`Email: ${USER_SELECTED.strEmail}\nPhone: ${USER_SELECTED.strPhone}`);
    }
  }
  /**
   * This function show the next 3 experiences in the array when the button is clicked.
   */
  showNext() {
    if(this.experienceEnd === this.experiencesLength) this.experienceEnd = 0;
    this.experienceStart += 3;
    this.experienceEnd += 3;
    if(this.experienceStart > this.experiencesLength) this.experienceStart = 0;
    if(this.experienceEnd > this.experiencesLength) this.experienceEnd = this.experiencesLength;
    this.experiencesListShown = [];
    this.experiencesListShown = this.experiencesList.slice(this.experienceStart, this.experienceEnd);
  }
  /**
   * If the user wants to add his experience, the object is saved in the DB,
   * after that, the page is reloaded to get the changes.
   */
  addExperience() {
    const NEW_EXPERIENCE = {
      boolStatus: true,
      strDescription: this.newExperience,
      strName: this.userComponent.userName,
      strEmail: this.userComponent.emailActualUser,
      strPhone: this.userComponent.phoneNumber,
      strPhoto: this.userComponent.photo
    }
    this.apiExperiencesService.addExperience(NEW_EXPERIENCE);
    alert("Experience added correctly");
    setTimeout(() => {
      window.location.reload();
    }, 700);
  }
  ngOnInit(): void {
  }

}
