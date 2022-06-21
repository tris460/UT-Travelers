import { Component, OnInit } from '@angular/core';
import { ApiForumService } from 'src/app/services/api-forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  ALL_QUESTIONS: Array<any> = [];
  questions: Array<any> = [];
  showFormAdd: boolean;
  newQuestion: string;
  newStatus: string;
  newTopic: string;
  filterBy: any;
  searchText: any = '';

  constructor(private apiForumService: ApiForumService) {
    this.showFormAdd = false;
    this.newQuestion = '';
    this.newStatus = '';
    this.newTopic = '';
    this.filterBy = '';
    setTimeout(() => {
      this.questions = apiForumService.questions;
      this.ALL_QUESTIONS = this.questions;
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
  filterQuestions() {
    this.filterBy = (<HTMLInputElement>document.getElementById("selectFilter")).value;
    this.questions = this.ALL_QUESTIONS.filter((q) => {
      switch(this.filterBy) {
        case "1.0":
          return this.questions;
        case "1.1":
          return q.strStatus === 'Solved';
        case "1.2":
          return q.strStatus === 'Unsolved';
        case "1.3":
          return q.strStatus === 'Urgent';
        case "1.4":
          return q.strStatus === 'Without answers';
        case "2.1":
          return q.strTopic === 'Costs';
        case "2.2":
          return q.strTopic === 'Dates';
        case "2.3":
          return q.strTopic === 'Others';
        default:
          return this.questions;
      }
    });
  }
  ngOnInit(): void {
  }

}
