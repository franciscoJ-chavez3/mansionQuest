import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { IRoomBackground } from '../interfaces/i-room-background';
import { IRoom } from '../interfaces/i-room';
import { IItem } from '../interfaces/i-item';
import { ISafe } from '../interfaces/i-safe';
import { INventory } from '../interfaces/i-nventory';
import { IUser } from '../interfaces/i-user';
import { Router } from '@angular/router';
//import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  //url to sheet 2 of room info in data
  //rooms
  sheet2URL = 'https://spreadsheets.google.com/feeds/list/1v5NuhtYRLfdSITmYV4wEHEZybMof2avup0-crqud5uQ/2/public/full?alt=json';
  //items
  sheet1URL = 'https://spreadsheets.google.com/feeds/list/1v5NuhtYRLfdSITmYV4wEHEZybMof2avup0-crqud5uQ/1/public/full?alt=json';
  //safe
  sheet3URL = 'https://spreadsheets.google.com/feeds/list/1v5NuhtYRLfdSITmYV4wEHEZybMof2avup0-crqud5uQ/3/public/full?alt=json';
  //inventory
  sheet4URL = 'https://spreadsheets.google.com/feeds/list/1v5NuhtYRLfdSITmYV4wEHEZybMof2avup0-crqud5uQ/4/public/full?alt=json';

  //following along with lecture api lecture part 2
  //apiURL: string = 'localhost:5000/roominfo';

  // replace apiURL by referencing environment
  public apiURL:string = environment.api;

  // created in jwt lecture #2: for login 
  private loginURL:string = this.apiURL + 'api/auth/login';
  private token;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : 'my-auth-token'
    })
  };

  googlesheet2; //used in parseDataForBackground
  roomSheet;  // used in parseRoomData
  itemSheet;  // used in parseItemData
  safeSheet;  // used in parseSafeData
  inventorySheet; //used in parseInventoryData
  private router: Router;

  rooms: IRoomBackground[] = [];
  roomData: IRoom[] = [];
  itemData: IItem[] = [];
  safeData: ISafe[] = [];
  inventoryData: INventory[] = [];

  //testing my backend
  apiRoomData: IRoom[] = [];
  //will store the roomdata from api, rather than googlesheets
  theRoomData;

  constructor(private http: HttpClient) {
    //this.parseDataForBackground();  //run to see at start
    //this.parseRoomData(); // run to see at start
    this.parseItemData(); // run to see at start
    this.parseSafeData();
    this.parseInventoryData();
    this.GetRoomsFromBackEnd();
  }

  // api lecture #2 - added 'roominfo' after jwt lecture
  getRoomsFromApi() {
    return this.http.get(this.apiURL+'roominfo');
  }

  // from api lecture Part 3 - added 'roominfo' after jwt lecture
  /*
  addTrack(request: any) {
    return this.http.post(this.apiURL+'roominfo', request);
  }
  */

  // from jwt lecture 2: login function
  login(credentials: IUser)
  {
    // Post Request
    // http.post( URL to post to, information to be passed )

    // set token to result of http post
    // this 'way' returns an Observable
    /*
    this.token = this.http.post(this.loginURL, credentials)
    console.log(this.token);
    */

    // second 'way' in jwt lecture #2
    this.http.post(this.loginURL, credentials).subscribe(data => {
      //set token
      this.token = data;
      console.log(this.token);
      //store token into localStorage
    });

    //this.router.navigate(['home']);
  }
  // from jwt lecture
  GetWeather() {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'bearer ' + this.token);
    this.http.get(this.apiURL+'weatherforecast', this.httpOptions).subscribe(data => {
      console.log(data);
    });
  }

  // testing my backend
  GetRoomsFromBackEnd()
  {
    // console log data
    this.http.get(this.apiURL+'room').subscribe(
      data => {
        // store rooms in global variable
        this.theRoomData = data;
        //console log
        console.log(this.theRoomData);
      }
    );
    
      /*
    //this.apiRoomData = this.http.get(this.apiURL+'room');
    console.log(this.apiRoomData);

    this.http.get(this.apiURL+'room').pipe(
      map((data: IRoom[]) => {
        this.apiRoomData = data;
        console.log(this.apiRoomData);
      }));
      */
  }
  // return room data from back to front
  GetTheRoomData()
  {
    return this.theRoomData;
  }

  // post user object to backend
  PostNewUser(newUser: IUser)
  {
    this.http.post(this.apiURL, newUser);
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
  /*
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
  */

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

  parseSafeData() {
    //dump sheet data
    this.safeSheet = this.http.get(this.sheet3URL);

    //parse item data using item interface
    this.safeSheet.subscribe(
      x => {
        for (let s of x.feed.entry) {
          let info: ISafe = {
            safeName: s.gsx$safename.$t,
            safeCombination: s.gsx$safecombination.$t as number
          }; // end of obj
          //push into array
          this.safeData.push(info);
        } // end of for
        // log item data
        console.log(this.safeData);
      } // end of arrow
    ); // end of subscribe
  }

  parseInventoryData() {
    //dump sheet data
    this.inventorySheet = this.http.get(this.sheet4URL);

    //parse item data using item interface
    this.inventorySheet.subscribe(
      x => {
        for (let i of x.feed.entry) {
          let info: INventory = {
            inventoryName: i.gsx$inventoryname.$t,
            inventoryText: i.gsx$inventorytext.$t,
            inventoryThere: i.gsx$inventorythere.$t as boolean
          }; // end of obj
          //push into array
          this.inventoryData.push(info);
        } // end of for
        // log item data
        console.log(this.inventoryData);
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

  getSafeData() {
    return this.safeData;
  }

  getInventoryData() {
    return this.inventoryData;
  }
}
