import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IRoomBackground } from '../interfaces/i-room-background';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  //declare varible to hold roominfo
  roomsInDropdown: IRoomBackground[];

  constructor(private ds: DataService) {
    //ds.getData().subscribe(x => console.log(x));
  }

  ngOnInit() {
    this.roomsInDropdown = this.ds.getRooms();
  }

  changeBackground(backgroundURL: string) {
    //say hello
    console.log('Hi! This is the changeBackground() function');
    //target element and change url of image
    document.getElementById("bground").style.backgroundImage = backgroundURL;
  }

}
