import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiExperiencesService {
  urlApi: string;
  experiences: any;

  constructor(private http: HttpClient) {
    this.urlApi = 'http://localhost:3000/api/experiences';
    this.experiences = [];
    this.getData();
  }
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
