import { Component, OnInit } from '@angular/core';
import { ApiForumService } from 'src/app/services/api-forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(private apiForumService: ApiForumService) { }

  ngOnInit(): void {
  }

}
