import { TreeError } from '@angular/compiler';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl,FormBuilder , Validators } from '@angular/forms'
import {ConfirmedValidator} from '../customValidator/conformValidation.validator';
import {AuthService} from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // signupForm=new FormGroup({
  //   name:new FormControl(),
  //   email:new FormControl(),
  //   pasword:new FormControl(),
  //   rep_password:new FormControl()
  // });

  signupForm;
  isSuccess=false;
  signupError:String="";
  constructor(private formBuilder: FormBuilder,private authService:AuthService,private router:Router  ) {

    this.signupForm=this.formBuilder.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]],
      rep_password:['',[Validators.required]],
      term:['',[Validators.requiredTrue]]
    },{validator:ConfirmedValidator('password','rep_password')});

   }
   get f(){
     return this.signupForm.controls;
   }

  ngOnInit(): void {
  }

  onSubmit(){
    const name=this.signupForm.get("name")?.value;
    const email=this.signupForm.get("email")?.value;
    const password=this.signupForm.get("password")?.value;
    
    this.authService.signup(name,email,password).subscribe(
      data=>{
        console.log(data);
        this.router.navigate(['login'],{queryParams:{signup:true}});
      },
      err=>{
        this.isSuccess=true;
        this.signupError=err.error.message;
        //console.log(err.error.message);
        
      }
    );
  }

}
