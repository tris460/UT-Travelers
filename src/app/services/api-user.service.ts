import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  urlApi: string;
  information: any;

  constructor(private http: HttpClient) {
    this.urlApi = 'http://localhost:3000/api/users';
    this.getData();
  }

  getData() {
    this.http.get(`${this.urlApi}/`)
      .subscribe({
        next: res => {
          setTimeout(() => {
            this.information = res;
          }, 500);
        },
        error: err => {
          console.error(err);
          this.information = [];
        }
      });
  }
}
