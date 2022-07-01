import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  urlApi: string; // URL's petition
  information: any; // Information from the petition

  constructor(private http: HttpClient) {
    this.urlApi = 'http://localhost:3000/api/users';
    this.getData();
  }

  /**
   * Do a petition to the URL and wait for the results.
   * If an error occurs, the array's information is going
   * to be empty.
   */
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
  /**
   * This function updates an existent user and then, it's executed the getData() function
   * to get the new information.
   * @param id User's identifier in the DB
   * @param data New data for the user, to update it's information
   */
  editUser(id: string, data: object) {
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
  /**
   * In this function, it's executed a POST petition sending the data,
   * after that, it executes the getData() function to get the new results.
   * @param data Information of the new user to be created as the
   * DB model says, it has to be an object
   */
  newUser(data: any) {
    this.http.post(`${this.urlApi}/`, data)
    .subscribe({
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
