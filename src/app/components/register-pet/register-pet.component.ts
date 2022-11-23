import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bounceInRight, bounceOutRight } from 'ng-animate';
import { Pet } from 'src/app/interfaces/pet';
import { User } from 'src/app/interfaces/user';
import { AutentifactionService } from 'src/app/services/autentifaction.service';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-register-pet',
  templateUrl: './register-pet.component.html',
  styleUrls: ['./register-pet.component.css'],
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
export class RegisterPetComponent {
  addPetForm: FormGroup
  pet: Pet | undefined
  user: User | undefined

  constructor(private fb: FormBuilder, private _petservice: PetService, private _loginService: AutentifactionService) {
    this.addPetForm = this.fb.group({
      name: ['', Validators.required],
      genre: ['', Validators.required],
      age: ['', Validators.required],
      typePet: ['', Validators.required],
      color: ['', Validators.required],
      weight: ['', Validators.required],
      numVacine: ['', Validators.required]
    })

  }

  userJson() {
    let jsonUser = JSON.parse(sessionStorage.getItem('User') as unknown as string)
    let jsonU = JSON.parse(jsonUser)
    console.log(jsonU.id)
    const user: User = {
      id: jsonU.id,
      fullname: jsonU.fullname,
      genre: jsonU.genre,
      age: jsonU.age,
      email: jsonU.email,
      mobileNumber: jsonU.mobileNumber,
      userName: jsonU.userName,
      password: jsonU.password
    }
    return user
  }

  addPet() {
    this.userJson()
    const pet: Pet = {
      name: this.addPetForm.get('name')?.value,
      genre: this.addPetForm.get('genre')?.value,
      age: this.addPetForm.get('age')?.value,
      typePet: this.addPetForm.get('typePet')?.value,
      color: this.addPetForm.get('color')?.value,
      weight: this.addPetForm.get('weight')?.value,
      numVacine: this.addPetForm.get('numVacine')?.value,
      userId: this.userJson().id
    }
    this._petservice.savePet(pet).subscribe({
      next: data => {
        this.pet = data
        console.log(pet)
        //Enviar a ver mascotas
      }, error: error => {
        console.log(error)
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