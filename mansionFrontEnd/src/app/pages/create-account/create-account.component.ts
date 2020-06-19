import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IUser } from 'src/app/interfaces/i-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  constructor(private ds: DataService, private router:Router) { }

  ngOnInit() {
  }

  create(uName: string, pWord: string){
    // pass params into user object
    let user: IUser = {
      userId: 0,
      username: uName,
      password: pWord,
    }
    // pass user object into dataservice - post to backend
    this.ds.createNewUser(user).subscribe(x => {
      //alert account has been created
      alert("Thank you for creating an account");
      //route to sign in page
      this.router.navigate(['signin']);
    });
  }


}
