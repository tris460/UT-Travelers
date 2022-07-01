import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiExperiencesService {
  urlApi: string; // URL to do the petition
  experiences: any; // Returning data from the petition GET

  constructor(private http: HttpClient) {
    this.urlApi = 'http://localhost:3000/api/experiences';
    this.experiences = [];
    this.getData();
  }
  /**
   * This function allows you to get the data from an API and read
   * the data from a variable, if there's an error, it will appear
   * in the console.
   */
  getData() {
    this.http.get(this.urlApi)
    .subscribe({
      next: res => {
        setTimeout(() => {
          this.experiences = res;
        }, 500)
      },
      error: err => {
        console.error(err);
        this.experiences = [];
      }
    });
  }
  /**
   * This function saves a new experience in the DB and then executes the function getData()
   * to update the actual data saved.
   * @param data This parameter is an object with the data needed to save
   * a new experience in the DB.
   */
  addExperience(data: object) {
    this.http.post(this.urlApi, data).subscribe({
      next: res => {
        this.getData();
      },
      error: err => {
        console.error(err);
      }
    });
  }
}
