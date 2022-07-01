import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiForumService {
  urlApi: string; // URL to do the petition
  questions: any; // Returning data from the petition GET

  constructor(private http: HttpClient) {
    this.urlApi = 'http://localhost:3000/api/forum';
    this.questions = [];
    this.getData();
  }
  /**
   * In this function is executed a petition GET, and the information
   * returned is saved in the 'questions' variable.
   * If there's an error, it will appear in the console and the variable results
   * is going to be an empty array.
   */
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
  /**
   * This function receives the data needed to create a new object, it executes
   * a PUT petition and then, it's executed the function getData() to update
   * the results.
   * @param data Information to add a new document in the DB, as in the DB model says.
   */
  addQuestion(data: object) {
    this.http.post(this.urlApi, data).subscribe({
      error: err => {
        console.error(err);
      }
    });
  }
  /**
   * This function will update a document in the DB depending the information sended,
   * it has to be as is indicated in the model
   * @param data Information to update a document in the DB, it has to be an object.
   * @param id Identifier for the document to update.
   */
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
