import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { bounceInRight, bounceOutRight } from 'ng-animate';
import { AutentifactionService } from 'src/app/services/autentifaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  animations: [
    trigger('showMsgError', [
      state('show', style({})),
      state('hide', style({
        opacity: 0
      })),
      transition('hide => show', useAnimation(bounceInRight, {
        params: {
          timing: 2
        }
      }
      )),
      transition('show => hide', useAnimation(bounceOutRight, {
        params: {
          timing: 2
        }
      }
      )),
    ])
  ]
})

export class LoginFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService: AutentifactionService, private _router: Router) { } //Traer el servicio de login

  ngOnInit(): void { }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  isUserValid: boolean = false

  loginSubmited() {
    this.loginService.loginUser([this.loginForm.value.username as string, this.loginForm.value.password as string])
      .subscribe({
        next: data => {
          if (data == 'Failure') {
            this.isUserValid = false;
            this.showMsgError()
          } else {
            this.loginService.saveSessionUser(data)
            this.isUserValid = true
            this._router.navigate([''])
          }
        }
      });
  }
  get Username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }



  //Funcion y variables para ver el msg
  time: number = 5000
  progress: string = "0%"
  showMsgErrorV: boolean = false

  showMsgError(): void {
    this.progress = "0%"
    this.showMsgErrorV = true
    let timeElapsed = 0
    const interval = setInterval(() => {
      timeElapsed += 10
      const progress = timeElapsed / this.time * 100
      this.progress = `${progress}%`
      if (timeElapsed >= this.time) {
        this.showMsgErrorV = false
        clearInterval(interval)
      }
    }, 10)
  }


}

