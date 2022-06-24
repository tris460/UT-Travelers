import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiForumService {
  urlApi: string;
  questions: any;

  constructor(private http: HttpClient) {
    this.urlApi = 'http://localhost:3000/api/forum';
    this.questions = [];
    this.getData();
  }
  getData() {
    this.http.get(this.urlApi)
    .subscribe({
      next: res => {
        setTimeout(() => {
          this.questions = res;
        }, 500)
      },
      error: err => {
        console.error(err);
        this.questions = [];
      }
    });
  }
  addQuestion(data: object) {
    this.http.post(this.urlApi, data).subscribe({
      error: err => {
        console.error(err);
      }
    });
  }
  editQuestion(data: object, id: string) {
    this.http.put(`${this.urlApi}/${id}`, data).subscribe({
      next: res => {
        setTimeout(() => {
          this.getData();
        }, 500);
      },
      error: err => {
        console.error(err);
      }
    })
  }
}
