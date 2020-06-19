import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private jwthelper:JwtHelperService, private router:Router) { }

  canActivate(){
    //grab token
    const token = localStorage.getItem('jwt');
    if (token && !this.jwthelper.isTokenExpired(token)) {
      console.log(this.jwthelper.decodeToken(token));
      return true;
    } else {
      localStorage.removeItem('jwt');
      this.router.navigate(['signin']);
      return false;
    }
  }
}
