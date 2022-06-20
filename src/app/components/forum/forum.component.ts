import { Component, OnInit } from '@angular/core';
import { ApiForumService } from 'src/app/services/api-forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  questions: Array<any> = [];
  showFormAdd: boolean;
  newQuestion: string;
  newStatus: string;
  newTopic: string;

  constructor(private apiForumService: ApiForumService) {
    this.showFormAdd = false;
    this.newQuestion = '';
    this.newStatus = '';
    this.newTopic = '';
    setTimeout(() => {
      this.questions = apiForumService.questions;
    }, 1000);
  }

  addQuestion() {
    if (this.newQuestion !== '' && this.newStatus !== '' && this.newTopic !== '') {
      const NEW_QUESTION = {
        strStatus: this.newStatus,
        arrAnswers: [],
        strTopic: this.newTopic,
        strQuestion:  this.newQuestion,
        dateDate: new Date(),
        idUser: localStorage.getItem("userUTraveler")
      };
      this.apiForumService.addQuestion(NEW_QUESTION);
      this.apiForumService.getData();
      alert('Your question has been published!');
      window.location.reload();
    } else {
      alert('Complete the fields correctly');
    }
  }
  showForm() {
    this.showFormAdd = true;
  }
  ngOnInit(): void {
  }

}
