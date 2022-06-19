import { Component, OnInit } from '@angular/core';
import { ApiCommentariesService } from 'src/app/services/api-commentaries.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  commentary: string;
  date = new Date();
  constructor(private apiCommentariesService: ApiCommentariesService) {
    this.commentary = '';
  }
  addCommentary() {
    if(this.commentary === '') {
      alert("Write a commentary first");
      return;
    }
    const NEW_COMMENTARY = {
      strCommentary: this.commentary,
      dateDate: this.date
    }
    this.apiCommentariesService.saveData(NEW_COMMENTARY);
    alert("Commentary sended correctly! :)");
    this.commentary = '';
  }
  ngOnInit(): void {
  }

}
