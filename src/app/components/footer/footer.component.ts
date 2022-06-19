import { Component, OnInit } from '@angular/core';
import { ApiCommentariesService } from 'src/app/services/api-commentaries.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  commentary: string; // What the user wrote
  date = new Date(); // When the user wrote the commentary
  constructor(private apiCommentariesService: ApiCommentariesService) {
    this.commentary = '';
  }
  /**
   * This function saves a new commentary in the database.
   * @returns Nothing if the commentary is an empty string, else,
   * just save the string.
   */
  addCommentary() {
    if(this.commentary === '') { // Validate the commentary isn't an empty string
      alert("Write a commentary first");
      return;
    }
    const NEW_COMMENTARY = {
      strCommentary: this.commentary,
      dateDate: this.date
    }
    this.apiCommentariesService.saveData(NEW_COMMENTARY); // Save the string in the DB
    alert("Commentary sended correctly! :)");
    this.commentary = '';
  }
  ngOnInit(): void {
  }

}
