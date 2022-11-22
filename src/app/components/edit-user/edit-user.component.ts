import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { bounceInRight, bounceOutRight } from 'ng-animate';
import { User } from 'src/app/interfaces/user';
import { AutentifactionService } from 'src/app/services/autentifaction.service';
import { UserService } from 'src/app/services/user.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
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

export class EditUserComponent implements OnInit {

  ngOnInit(): void {
    console.log(this.loginService.sendIdUserLogin())
    this.id = this.loginService.sendIdUserLogin()
    console.log(this.id)
    this.getUser()
  }
  editUserForm: FormGroup
  id?: number
  user: User | undefined


  constructor(private fb: FormBuilder, private _userService: UserService, private router: Router, private loginService: AutentifactionService) {
    this.editUserForm = this.fb.group({
      fullname: ['', Validators.required],
      genre: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  getUser() {
    this._userService.getUser(this.id as number).subscribe({
      next: data => {
        console.log(data)
        this.editUserForm.patchValue({
          fullname: data.fullname,
          genre: data.genre,
          age: data.age,
          email: data.email,
          mobileNumber: data.mobileNumber,
          userName: data.userName,
          password: data.password
        })

      }
    })
  }

  updateUser() {
    this.id = this.loginService.sendIdUserLogin()
    const user: User = {
      fullname: this.editUserForm.get('fullname')?.value,
      genre: this.editUserForm.get('genre')?.value,
      age: this.editUserForm.get('age')?.value,
      email: this.editUserForm.get('email')?.value,
      mobileNumber: String(this.editUserForm.get('mobileNumber')?.value),
      userName: this.editUserForm.get('userName')?.value,
      password: this.editUserForm.get('password')?.value,
    }
    console.log(this.id)
    this._userService.updateUser(this.id as number, user).subscribe({
      next: data => {
        this.showMsgUpdate()
        this.getUser()
      }, error: error => {
        console.log(error)
      },
    })
  }

  deleteUser() {
    if (confirm("¿Esta seguro de eliminar su usuario?")) {
      this.id = this.loginService.sendIdUserLogin()
      this._userService.deleteUser(this.id as number).subscribe({
        next: data => {
          console.log(data)
          if (data == "Delete") {
            window.alert("Usuario eliminado!")
            this.router.navigate(['/'])
            this.loginService.deleteSessionUser()
          }
        }, error: error => {
          if (error.status == 200) {
            window.alert("Usuario eliminado!")
            this.router.navigate(['/'])
            this.loginService.deleteSessionUser()
          }
        }
      })
    }
  }

  //Funcion y variables para ver el msg
  time: number = 5000
  progress: string = "0%"
  showMsgUpdateV: boolean = false

  showMsgUpdate(): void {
    this.progress = "0%"
    this.showMsgUpdateV = true
    let timeElapsed = 0
    const interval = setInterval(() => {
      timeElapsed += 10
      const progress = timeElapsed / this.time * 100
      this.progress = `${progress}%`
      if (timeElapsed >= this.time) {
        this.showMsgUpdateV = false
        clearInterval(interval)
      }
    }, 10)
  }
}
