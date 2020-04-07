import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IRoomBackground } from '../interfaces/i-room-background';
import { IRoom } from '../interfaces/i-room';
import { IItem } from '../interfaces/i-item';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  //declare varible to hold roominfo
  //change from IRoomBackground to IRoom
  roomsInDropdown: IRoom[];

  //declare array to hold item data
  itemsInRooms: IItem[];

  //create boolean to control items shown upon click
  showItems = false;

  constructor(private ds: DataService) {
    //ds.getData().subscribe(x => console.log(x));
  }

  ngOnInit() {
    //used for original run
    //this.roomsInDropdown = this.ds.getRooms();
    //call function that return rooms that are NOT hidden
    this.roomsInDropdown = this.ds.getVisibleRooms();
    this.itemsInRooms = this.ds.getItems();
  }

  changeBackground(backgroundURL: string) {
    //change showItems
    this.showItems = true;
    //say hello
    console.log('Hi! This is the changeBackground() function');
    //target element and change url of image
    document.getElementById("bground").style.backgroundImage = backgroundURL;
  }

}
