import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { bounceInRight, bounceOutRight } from 'ng-animate';
import { AutentifactionService } from 'src/app/services/autentifaction.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private loginService: AutentifactionService) { }
  idUserLogin: number | undefined

  public loginUser(): boolean {
    this.idUserLogin = this.loginService.sendIdUserLogin()
    return this.loginService.userValidation()
  }
  /*sendIdUserLogin(): number {
    console.log(this.idUserLogin)
    return this.idUserLogin as number
  }*/
  cerrarSesion() {
    this.loginService.deleteSessionUser()
    this.loginUser()
  }
}
