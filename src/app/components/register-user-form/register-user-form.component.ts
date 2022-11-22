import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bounceInRight, bounceOutRight } from 'ng-animate';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrls: ['./register-user-form.component.css'],
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
export class RegisterUserFormComponent {
  addUserForm: FormGroup
  user: User | undefined

  constructor(private fb: FormBuilder, private _userService: UserService, private router: Router) {
    this.addUserForm = this.fb.group({
      fullname: ['', Validators.required],
      genre: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  addUser() {
    const user: User = {
      fullname: this.addUserForm.get('fullname')?.value,
      genre: this.addUserForm.get('genre')?.value,
      age: this.addUserForm.get('age')?.value,
      email: this.addUserForm.get('email')?.value,
      mobileNumber: String(this.addUserForm.get('mobileNumber')?.value),
      userName: this.addUserForm.get('userName')?.value,
      password: this.addUserForm.get('password')?.value,
    }
    console.log(user)
    this._userService.saveUser(user).subscribe({
      next: data => {
        console.log(data)
        this.user = data
        this.router.navigate(['/login'])
      }, error: _error => {
        return this.showMsgError()
      }
    })
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