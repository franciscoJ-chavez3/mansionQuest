import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/i-user';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';
//import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private dService: DataService, private router: Router) { }

  ngOnInit() {
  }

  //create login function
  login(uName: string, pWord: string) {
    // pass param values into obj
    let credentials = {
      username: uName,
      password: pWord,
    }
    //pass user interface object into login in dataservice
    this.dService.login(credentials);
  }
}
