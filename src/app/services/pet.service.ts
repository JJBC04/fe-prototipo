import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../interfaces/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private myAppUrl = 'https://localhost:7178/'
  private myApiUrl = 'api/Pet/'

  constructor(private http: HttpClient) { }

  savePet(pet: Pet): Observable<any> {
    return this.http.post(this.myAppUrl + this.myApiUrl, pet)
  }

  getPets(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl)
  }

}
