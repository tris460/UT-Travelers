import { Component, OnInit } from '@angular/core';
import { ApiForumService } from 'src/app/services/api-forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  ALL_QUESTIONS: Array<any> = []; // Questions registered in the DB
  questions: Array<any> = []; // Questions filtered by the user choice
  showFormAdd: boolean; // If show the form to add a question
  newQuestion: string; // Text of the new question
  newStatus: string; // New question's status
  newTopic: string; // New question's topic
  filterBy: any; // How the questions are going to be filtered
  searchText: any = ''; // Text to search in the search bar
  totalQuestionsNumber: number = 0; // How many questions are registered in the DB
  showXQuestions: number = 3; // How many questions show in case have so much
  allQuestionsVisible: boolean = false; // If all the questions are shown
  questionAnswer: string; // New answer to be saved for a question

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
  /**
   * If the fields has been filled, a new question is added to the DB and then, the
   * page is reloaded to get the data updated.
   */
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
  /**
   * This function allows you to see the form to add a question.
   */
  showForm() {
    this.showFormAdd = true;
  }
  /**
   * With this function you can show just the elements you want to see,
   * in this case, there're just a few, according to the questions registered,
   * it is done by the function filter().
   */
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
  /**
   * If there're questions hided, this function allows you to view three more
   * until all the questions are shown.
   */
  viewMore() {
    this.showXQuestions += 3;
    this.questions = this.ALL_QUESTIONS.slice(0,this.showXQuestions);
    if(this.showXQuestions >= this.totalQuestionsNumber) {
      this.allQuestionsVisible = true;
    }
  }
  /**
   * This function hide some questions from the screen if there're more
   * than three.
   */
  viewLess() {
    this.showXQuestions -= 3;
    this.questions = this.ALL_QUESTIONS.slice(0,-this.showXQuestions);
    if(this.showXQuestions <= 3) {
      this.allQuestionsVisible = false;
    }
  }
  /**
   * This function edits a question, adding the answers wrote to the DB.
   * @param index Index of the question where the user is answering
   */
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
  /**
   * Get the value selected by the user for the selectStatus element.
   */
  selectStatus() {
    this.newStatus = (<HTMLInputElement>document.getElementById("selectStatus")).value;
  }
  /**
   * Get the value selected by the user for the selectTopic element.
   */
  selectTopic() {
    this.newTopic = (<HTMLInputElement>document.getElementById("selectTopic")).value;
  }
  ngOnInit(): void {
  }

}
