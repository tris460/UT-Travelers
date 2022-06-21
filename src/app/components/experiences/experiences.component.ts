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
      console.log(this.experiencesList)
    }, 1000);
  }

  ngOnInit(): void {
  }

}
