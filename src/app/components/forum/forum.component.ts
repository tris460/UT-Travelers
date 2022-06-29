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
  totalQuestionsNumber: number = 0;
  showXQuestions: number = 3;
  allQuestionsVisible: boolean = false;
  questionAnswer: string;

  constructor(private apiForumService: ApiForumService) {
    this.showFormAdd = false;
    this.newQuestion = '';
    this.newStatus = 'Unsolved';
    this.newTopic = 'Others';
    this.filterBy = '';
    this.questionAnswer = '';
    setTimeout(() => {
      this.questions = apiForumService.questions;
      this.ALL_QUESTIONS = this.questions;
      this.totalQuestionsNumber = this.ALL_QUESTIONS.length;
      if(this.ALL_QUESTIONS.length >= 3){
        this.questions = this.ALL_QUESTIONS.slice(0,this.showXQuestions);
      } else {
        this.showXQuestions = this.totalQuestionsNumber;
        this.allQuestionsVisible = true;
      }
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
  viewMore() {
    this.showXQuestions += 3;
    this.questions = this.ALL_QUESTIONS.slice(0,this.showXQuestions);
    if(this.showXQuestions >= this.totalQuestionsNumber) {
      this.allQuestionsVisible = true;
    }
  }
  viewLess() {
    this.showXQuestions -= 3;
    this.questions = this.ALL_QUESTIONS.slice(0,-this.showXQuestions);
    if(this.showXQuestions <= 3) {
      this.allQuestionsVisible = false;
    }
  }
  addAnswer(index: number) {
    let question = this.questions[index];
    question.arrAnswers.push(this.questionAnswer);
    let idQuestion = question._id;
    const EDITED_QUESTION = {
      strStatus: question.strStatus,
      arrAnswers: question.arrAnswers,
      strTopic: question.strTopic,
      strQuestion: question.strQuestion,
      dateDate: question.dateDate,
      idUser: question.idUser,
    };
    this.apiForumService.editQuestion(EDITED_QUESTION, idQuestion);
    alert("Answer added correctly");
    this.questionAnswer = '';
  }
  selectStatus() {
    this.newStatus = (<HTMLInputElement>document.getElementById("selectStatus")).value;
  }
  selectTopic() {
    this.newTopic = (<HTMLInputElement>document.getElementById("selectTopic")).value;
  }
  ngOnInit(): void {
  }

}
