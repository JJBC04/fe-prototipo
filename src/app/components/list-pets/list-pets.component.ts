import { state, style, transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { bounceInRight, bounceOutRight } from 'ng-animate';
import { Pet } from 'src/app/interfaces/pet';
import { AutentifactionService } from 'src/app/services/autentifaction.service';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-list-pets',
  templateUrl: './list-pets.component.html',
  styleUrls: ['./list-pets.component.css'],
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
export class ListPetsComponent implements OnInit {
  listPets: Pet[] = [];
  petObj: object[] = [];
  constructor(private _petservice: PetService, private _loginService: AutentifactionService) { }

  ngOnInit(): void {
    this.getAllPets()
  }

  getAllPets() {
    //let petObj: object[] = []
    this._petservice.getPets().subscribe({
      next: data => {
        this.petObj = data
        this.getAllPets = data
        console.log(this.petObj)
        if (this.petObj.length == 0) {
          console.log("Here") //vacio decir que ingrese mascotas
        } else {
          let n = 0
          for (const e in this.petObj) {
            n++
          }
          this.recorreraray(n)
        }
      }, error: error => {
        console.log(error)
      }
    })
  }

  recorreraray(n: number) {
    let jsonUser = JSON.parse(sessionStorage.getItem('User') as unknown as string)
    let jsonU = JSON.parse(jsonUser)
    for (let i = 0; i < n; i++) {
      if (Object.values(this.petObj[i])[7] == jsonU.id) {
        console.log(Object.values(this.petObj[i])[7])
        console.log(jsonU.id)
        this.listPets[i] = {
          age: Object.values(this.petObj[i])[0],
          color: Object.values(this.petObj[i])[1],
          genre: Object.values(this.petObj[i])[2],
          id: Object.values(this.petObj[i])[3],
          name: Object.values(this.petObj[i])[4],
          numVacine: Object.values(this.petObj[i])[5],
          typePet: Object.values(this.petObj[i])[6],
          weight: Object.values(this.petObj[i])[7]
        }
        console.log(this.listPets)
      }
    }
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
