import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiCommentariesService {
  urlApi: string;
  information: any;

  constructor(private http: HttpClient) {
    this.urlApi = 'http://localhost:3000/api/commentaries';
  }
  saveData(data: object) { // Save a new commentary in the DB
    this.http.post(this.urlApi, data).subscribe({
      error: err => {
        console.error(err);
      }
    });
  }
}
