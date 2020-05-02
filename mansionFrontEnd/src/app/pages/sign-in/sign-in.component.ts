import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/i-user';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
//import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  //object to put credentials into
  userLogin: IUser = {
    userID:0,
    username: '',
    password: ''
  };

  constructor(private dService: DataService,
              // add router to manually route to a designated page
              private router: Router) { }

  ngOnInit() {
  }

  /*
  // was playing with ReactiveForms, put on hold
  profileForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  */

  //create login function
  login(uName: string, pWord: string) {
    
    //check username/password are empty
    //check length of password
    //store into object
    this.userLogin =
      {
        userID:0,
        username: uName,
        password: pWord
      };

    //pass user interface object into login in dataservice
    this.dService.login(this.userLogin);

    //route to home page after successful login - moved to service
    //create condition to implement navigate upon a successful login
    this.router.navigate(['home']);
    
  }

}
