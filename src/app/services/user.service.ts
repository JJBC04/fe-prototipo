import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl = 'https://localhost:7178/'
  private myApiUrl = 'api/User/'
  constructor(private http: HttpClient) { }

  saveUser(user: User): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, user)
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(this.myAppUrl + this.myApiUrl + id, user)
  }

  getUser(id: number): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl + id)
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myApiUrl + id)
  }
}
