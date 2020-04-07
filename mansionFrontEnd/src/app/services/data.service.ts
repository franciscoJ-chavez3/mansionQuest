import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRoomBackground } from '../interfaces/i-room-background';
import { IRoom } from '../interfaces/i-room';
import { IItem } from '../interfaces/i-item';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  //url to sheet 2 of room info in data
  sheet2URL = 'https://spreadsheets.google.com/feeds/list/1v5NuhtYRLfdSITmYV4wEHEZybMof2avup0-crqud5uQ/2/public/full?alt=json';

  sheet1URL = 'https://spreadsheets.google.com/feeds/list/1v5NuhtYRLfdSITmYV4wEHEZybMof2avup0-crqud5uQ/1/public/full?alt=json';

  googlesheet2; //used in parseDataForBackground
  roomSheet;  // used in parseRoomData
  itemSheet;  // used in parseItemData

  rooms: IRoomBackground[] = [];
  roomData: IRoom[] = [];
  itemData: IItem[] = [];

  constructor(private http: HttpClient) {
    //this.parseDataForBackground();  //run to see at start
    this.parseRoomData(); // run to see at start
    this.parseItemData(); // run to see at start
  }

  getData() {
    return this.http.get(this.sheet1URL);
  }

  parseDataForBackground() {
    //why 
    this.googlesheet2 = this.http.get(this.sheet2URL);

    //parse
    this.googlesheet2.subscribe(
      x => {
        for (let r of x.feed.entry) {
          let info: IRoomBackground = {
            roomName: r.gsx$roomname.$t,
            roomURL: r.gsx$roombackground.$t
          }; //end of obj
          //push into array
          this.rooms.push(info);
        } //end of for
        //log rooms
        console.log(this.rooms);
      } //end of arrow
    );  //end of subscribe
  }

  parseRoomData() {
    //  dump sheet data onto roomsheet
    this.roomSheet = this.http.get(this.sheet2URL);

    //  parse sheet data 
    this.roomSheet.subscribe(
      x => {
        for (let r of x.feed.entry) {
          let info: IRoom = {
            roomID: r.gsx$id.$t as number,
            roomName: r.gsx$roomname.$t,
            roomIsHidden: r.gsx$roomhidden.$t as boolean,
            roomIsLocked: r.gsx$roomlocked.$t as boolean,
            roomIsDark: r.gsx$roomdark.$t as boolean,
            roomURL: r.gsx$roombackground.$t,
            roomLockedText: r.gsx$roomlockedtext.$t,
            roomDarkText: r.gsx$roomdarktext.$t
          }; //end of obj
          //push into array
          this.roomData.push(info);
        } //end of for
        //log rooms
        console.log(this.roomData);
      } //end of arrow
    );  //end of subscribe
  }

  parseItemData() {
    //dump sheet data
    this.itemSheet = this.http.get(this.sheet1URL);

    //parse item data using item interface
    this.itemSheet.subscribe(
      x => {
        for (let i of x.feed.entry) {
          let info: IItem = {
            itemID: i.gsx$id.$t as number,
            itemName: i.gsx$nameofitem.$t,
            itemDesc: i.gsx$descofitem.$t,
            itemLocation: i.gsx$locationofitem.$t,
            itemHasDecision: i.gsx$itemhasdecision.$t as boolean,
            itemDecision: i.gsx$decisionofitem.$t,
            itemChoice1: i.gsx$choice1ofitem.$t,
            itemChoice2: i.gsx$choice2ofitem.$t,
            itemResult: i.gsx$resultofitem.$t,
            itemHidden: i.gsx$itemishidden.$t as boolean
          }; // end of obj
          //push into array
          this.itemData.push(info);
        } // end of for
        // log item data
        console.log(this.itemData);
      } // end of arrow
    ); // end of subscribe
  }

  getRooms() {
    return this.rooms;
  }

  //use .filter to meet condition of whether room is visible
  //nvm, used ngIf to test if room is hidden
  getVisibleRooms() {
    return this.roomData;
  }

  getItems() {
    return this.itemData;
  }
}
