import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IRoom } from '../interfaces/i-room';
import { IItem } from '../interfaces/i-item';
import { ISafe } from '../interfaces/i-safe';

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

  //for safes
  safeInfo: ISafe[];

  //create boolean to control items shown upon click
  showItems = false;

  //set to this for items
  theRoomName: string;

  //set to this for decisions
  isVisible = false;



  constructor(private ds: DataService) {
    //ds.getData().subscribe(x => console.log(x));
  }

  ngOnInit() {
    //used for original run
    //this.roomsInDropdown = this.ds.getRooms();
    //call function that return rooms that are NOT hidden
    this.roomsInDropdown = this.ds.getVisibleRooms();
    this.itemsInRooms = this.ds.getItems();
    this.safeInfo = this.ds.getSafeData();
  }

  changeBackground(backgroundURL: string, roomName: string) {
    //change showItems
    this.showItems = true;
    //set theRoomName
    this.theRoomName = roomName;
    //say hello
    console.log('Hi! This is the changeBackground() function');
    //target element and change url of image
    document.getElementById("bground").style.backgroundImage = backgroundURL;
    //hide decision
    this.hideDecision();
  }

  //add decision, choices, and result as parameters
  addToTextArea(desc: string, hasDecision: string, decision: string, choice1: string, choice2: string, result: string, name: string) {
    //target textarea
    let txtArea = document.getElementById('txtArea');
    //add to innerHTML not innerText
    txtArea.innerHTML += desc;

    //target decisionheader & btns
    let decisionHeader = document.getElementById('decisionHeader');
    let btn1 = document.getElementById('choice1');
    let btn2 = document.getElementById('choice2');

    //safe
    let safeInput = document.getElementById('safeInput');

    //test hasDecision
    if (hasDecision === "TRUE") {
      //set visibility
      decisionHeader.style.visibility = 'visible';
      //set innerText to decision
      decisionHeader.innerText = decision;
      //rinse and repeat
      btn1.style.visibility = 'visible';
      btn2.style.visibility = 'visible';
      //set innertext
      btn1.innerText = choice1;
      btn2.innerText = choice2;

      //all safes have decsions
      for (let i = 0; i < this.safeInfo.length; i++) {
        if (name === this.safeInfo[i].safeName) {
          safeInput.style.visibility = 'visible';
        }
      }

    } else {
      decisionHeader.style.visibility = 'hidden';
      btn1.style.visibility = 'hidden';
      btn2.style.visibility = 'hidden';
    }
  }

  //made to handle visibility in between a room change
  hideDecision() {
    let decisionHeader = document.getElementById('decisionHeader');
    let btn1 = document.getElementById('choice1');
    let btn2 = document.getElementById('choice2');

    decisionHeader.style.visibility = 'hidden';
    btn1.style.visibility = 'hidden';
    btn2.style.visibility = 'hidden';
  }

}
