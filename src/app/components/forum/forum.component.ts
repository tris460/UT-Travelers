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

  constructor(private apiForumService: ApiForumService) {
    this.showFormAdd = false;
    setTimeout(() => {
      this.questions = apiForumService.questions;
    }, 1000);
  }
  addQuestion() {
    console.log("question")
  }
  showForm() {
    this.showFormAdd = true;
  }
  ngOnInit(): void {
  }

}
