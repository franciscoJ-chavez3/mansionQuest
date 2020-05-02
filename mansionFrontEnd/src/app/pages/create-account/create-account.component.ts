import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { IUser } from 'src/app/interfaces/i-user';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  constructor(private ds: DataService) { }

  ngOnInit() {
  }

  create(uName: string, pWord: string)
  {
    // pass params into user object
    let user: IUser = {
      username: uName,
      password: pWord
    }

    // pass user object into dataservice - post to backend

  }


}
