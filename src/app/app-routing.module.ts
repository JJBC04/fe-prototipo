import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './components/edit-user/edit-user.component';

import { HomePageComponent } from './components/home-page/home-page.component';
import { ListPetsComponent } from './components/list-pets/list-pets.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterPetComponent } from './components/register-pet/register-pet.component';
import { RegisterUserFormComponent } from './components/register-user-form/register-user-form.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'register-user', component: RegisterUserFormComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'register-pet', component: RegisterPetComponent },
  { path: 'list-pet', component: ListPetsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
