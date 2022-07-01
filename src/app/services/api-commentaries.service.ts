import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiCommentariesService {
  urlApi: string; // URL to do the petition

  constructor(private http: HttpClient) {
    this.urlApi = 'http://localhost:3000/api/commentaries';
  }
  /**
   * This function saves a commentary in the DB.
   * @param data Object with the information needed to save a new commentary in the DB
   */
  saveData(data: object) {
    this.http.post(this.urlApi, data).subscribe({
      error: err => {
        console.error(err);
      }
    });
  }
}
