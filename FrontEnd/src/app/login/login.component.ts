import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../Services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public signup:any=false;
  loginForm;
  loginError:String="";
  loginSuccess=true;
  constructor(private Activatedroute:ActivatedRoute,private formBuilder:FormBuilder,private authService:AuthService,private router:Router) {
    this.Activatedroute.queryParamMap
    .subscribe(params => { 
      this.signup = params.get('signup')||false;
    });
    this.loginForm=this.formBuilder.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    });
  }

  get f(){
    return this.loginForm.controls;
  }
  ngOnInit(): void {
  }

  onSubmit(){

    const email=this.loginForm.get('email')?.value;
    const password=this.loginForm.get('password')?.value;
    this.authService.login(email,password).subscribe(
      data=>{
        console.log(data);
        this.router.navigate(['home']);
      },
      err=>{
        this.loginSuccess=false;
        this.loginError=err.error.message;
        console.log(err);
        
      }
    );
  }

}
