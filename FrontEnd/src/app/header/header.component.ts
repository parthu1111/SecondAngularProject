import { Component, OnInit,ChangeDetectorRef ,OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import {TokenStorageService} from '../Services/token-storage.service';
import {AuthService} from '../Services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnChanges {

  isLogin=true;

  constructor(private router: Router,private tokenService:TokenStorageService,private authService:AuthService,private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit(): void {

    if(this.tokenService.getToken()){
      this.isLogin=this.authService.isSignedIn;
      this.authService.signInChange.subscribe(value=>{
        this.isLogin=value;
        this.changeDetectorRef.detectChanges();
      })
    }
   
  }

  ngOnChanges():void{
    if(this.tokenService.getToken()){
      this.isLogin=this.authService.isSignedIn;
      this.authService.signInChange.subscribe(value=>{
        this.isLogin=value;
        this.changeDetectorRef.detectChanges();
      })
    }
  }

  login():any{
    //console.log("login event occured");
    this.router.navigate(['/login']);
  }
  logout():any{
    this.authService.isSignedIn=false;
    this.authService.signInChange.next(this.authService.isSignedIn);
    this.tokenService.signout();
    this.changeDetectorRef.detectChanges();
    this.router.navigate(['/login']);
  }
}
