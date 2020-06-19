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

  // replace apiURL by referencing environment
  public apiURL:string = environment.api;
  // created in jwt lecture #2: for login 
  private loginURL:string = this.apiURL + 'api/auth/login';
  private createUrl:string = this.apiURL + 'login';
  private token:any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization' : 'my-auth-token'
    })
  };
  googlesheet2:any; //used in parseDataForBackground
  roomSheet:any;  // used in parseRoomData
  itemSheet:any;  // used in parseItemData
  safeSheet:any;  // used in parseSafeData
  inventorySheet:any; //used in parseInventoryData
  rooms: IRoomBackground[] = [];
  roomData: IRoom[] = [];
  itemData: IItem[] = [];
  safeData: ISafe[] = [];
  inventoryData: INventory[] = [];
  //testing my backend
  apiRoomData: IRoom[] = [];
  //will store the roomdata from api, rather than googlesheets
  theRoomData:any;

  constructor(private http: HttpClient, private router:Router) {
    this.parseItemData();
    this.parseSafeData();
    this.parseInventoryData();
  }

  // api lecture #2 - added 'roominfo' after jwt lecture
  getRoomsFromApi() {
    return this.http.get(this.apiURL+'roominfo');
  }

  // from jwt lecture 2: login function
  login(credentials: any){
    this.http.post(this.loginURL, credentials).subscribe(data => {
      //set token
      this.token = data;
      this.token = this.token.token;
      //save to local storage
      localStorage.setItem('jwt', JSON.stringify(this.token));
      console.log(this.token);
      //navigate to home
      this.router.navigate(['home']);
    });
  }

  createNewUser(user:IUser){
     return this.http.post(this.createUrl, user);
  }
  // from jwt lecture
  GetWeather() {
    const tokenInfo = 'bearer ' + JSON.parse(localStorage.getItem('jwt'));
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', tokenInfo); 
    this.http.get(this.apiURL+'weatherforecast', this.httpOptions).subscribe(data => {
      console.log(data);
    });
  }

  // testing my backend
  GetRoomsFromBackEnd(){
    return this.http.get(this.apiURL+'room');
  }
  // return room data from back to front
  GetTheRoomData(){
    return this.theRoomData;
  }

  // post user object to backend / replaced by create new user
  PostNewUser(newUser: IUser){
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
        this.loadItems();
      } // end of arrow
    ); // end of subscribe
  }

  loadItems(){
    for(let index = 0; index < this.itemData.length; index++){
      this.itemData[index].itemHidden = false;
      if(this.itemData[index].itemName === 'note behind brick' || this.itemData[index].itemName === 'smoke pipe behind brick' || this.itemData[index].itemName === 'music sheet piece #1'){
        this.itemData[index].itemHidden = true;
      }
    }
    console.log(this.itemData);
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
            inventoryThere: i.gsx$inventorythere.$t as boolean,
            room: i.gsx$room.$t
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
