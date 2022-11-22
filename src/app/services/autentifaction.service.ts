import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AutentifactionService {

  private enter: boolean = false //Variable para mostrar o no los menus al usuario
  constructor(private http: HttpClient) { }
  private myAppUrl = 'https://localhost:7178/'
  private myApiUrl = 'api/User/'

  loginUser(loginInfo: Array<string>) {
    return this.http.post(this.myAppUrl + this.myApiUrl + 'LoginUser', {
      Username: loginInfo[0],
      Password: loginInfo[1]
    }, {
      responseType: 'text',
    })
  }

  idUserLogin?: number
  saveSessionUser(id: any) {
    this.idUserLogin = id
    this.enter = true
    this.sendIdUserLogin()
    return this.idUserLogin //Acceder al id del usuario logeado
  }

  sendIdUserLogin() {
    return this.idUserLogin
  }

  deleteSessionUser() {
    this.enter = false

  }
  userValidation(): boolean { //Validar controles al usuario
    return this.enter
  }

}
