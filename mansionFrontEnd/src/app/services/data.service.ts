import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRoomBackground } from '../interfaces/i-room-background';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  //url to sheet 2 of room info in data
  sheet2URL = 'https://spreadsheets.google.com/feeds/list/1v5NuhtYRLfdSITmYV4wEHEZybMof2avup0-crqud5uQ/2/public/full?alt=json';

  googlesheet2;

  rooms: IRoomBackground[] = [];

  constructor(private http: HttpClient) {
    this.parseDataForBackground();
  }

  getData() {
    return this.http.get(this.sheet2URL);
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

  getRooms() {
    return this.rooms;
  }
}
