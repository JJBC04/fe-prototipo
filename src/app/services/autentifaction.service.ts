import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AutentifactionService {

  user: User | undefined
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
  saveSessionUser(User: User) {
    this.idUserLogin = User.id as unknown as number
    this.user = User
    this.enter = true
    this.sendIdUserLogin()
    sessionStorage.setItem('id', User.id as unknown as string)
    sessionStorage.setItem('User', JSON.stringify(this.user) as unknown as string)
    console.log(this.user)
    return this.user //Acceder al id del usuario logeado
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
