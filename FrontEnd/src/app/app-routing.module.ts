import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './Services/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:'home', component:HomeComponent,canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path: 'login', component:LoginComponent},
  {path: 'signup',component:SignupComponent},
  {path: '',redirectTo:'home',pathMatch:'full'},
  {path:'**' ,component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
