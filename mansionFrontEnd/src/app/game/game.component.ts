import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IRoom } from '../interfaces/i-room';
import { IItem } from '../interfaces/i-item';
import { ISafe } from '../interfaces/i-safe';
import { INventory } from '../interfaces/i-nventory';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  //declare array to hold item data
  itemsInRooms: IItem[];
  //for safes
  safeInfo: ISafe[];
  //for inventory
  inventoryInfo: INventory[];
  rInDropdown:any;
  //create boolean to control items shown upon click
  showItems = false;
  //set to this for items
  theRoomName: string;
  // set to this for reference in choice1 click addtoinventory
  nameOfItemClicked: string;
  //set to this for decisions
  isVisible = false;
  //store result of clicked item
  currentResult:string;
  //store index of clicked item/room
  idxOfItm:number;
  idxOfRoom:number;


  constructor(private ds: DataService) {
  }

  ngOnInit() {
    // set rInDropdown
    this.ds.GetRoomsFromBackEnd().subscribe(x => {
      this.rInDropdown = x;
    console.log(this.rInDropdown);
    });

    //grabed rooms from backend, replaced by rInDropdown
    this.safeInfo = this.ds.getSafeData();
    this.inventoryInfo = this.ds.getInventoryData();
    this.itemsInRooms = this.ds.getItems();
  }

  changeBackground(backgroundURL: string, roomName: string, roomIsLocked: boolean, roomIndex:number) {
    //test if room is locked
    //console.log(this.rInDropdown[roomIndex]);
    if(roomIsLocked === true){
      this.theRoomName = roomName;
      this.idxOfRoom = roomIndex;
      document.getElementById('txtArea').innerHTML += ('This room is locked' + '&#13;&#10;');
      //prevent items from showing
      this.showItems = false;
      //check user inventory for locked doors
      for(let i = 0; i < this.inventoryInfo.length; i++){
        if(this.inventoryInfo[i].room === this.theRoomName && this.inventoryInfo[i].inventoryThere === true){
          document.getElementById('txtArea').innerHTML += 'Oh wait, you have a key!' + '&#13;&#10;';
          this.rInDropdown[roomIndex].roomIsLocked = false;
          //console.log(this.rInDropdown[roomIndex]);
          document.getElementById('txtArea').innerHTML += '     Click on ' + this.theRoomName + ' again.' + '&#13;&#10;';
        }
      }
    } else {
      //change showItems
      this.showItems = true;
      //set theRoomName
      this.theRoomName = roomName;
      //target element and change url of image
      document.getElementById("bground").style.backgroundImage = backgroundURL;
      //hide decision
      this.hideDecision();
    }
    
  }

  //add decision, choices, and result as parameters
  addToTextArea(desc: string, hasDecision: string, decision: string, choice1: string, choice2: string, result: string, name: string, i: number) {
    //set nameOfItemClicked
    this.nameOfItemClicked = name;
    //set currentResult
    this.currentResult = result;
    //set idxOfItem
    this.idxOfItm = i;
    //target textarea
    let txtArea = document.getElementById('txtArea');
    //add to innerHTML not innerText
    txtArea.innerHTML += ('&#13;&#10;' + desc + '&#13;&#10;');
    txtArea.scrollTop = txtArea.scrollHeight;

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

  addToInventory() {
    //refactor code later to proper seperate function that handles events
    //handle for both conditions being 'there' not just 1 or the other
    if(this.nameOfItemClicked === 'Bust of Sherlock Holmes'){
      //check inventory
      for(let x = 0; x < this.inventoryInfo.length; x++){
        if(this.inventoryInfo[x].inventoryName === 'hat' || this.inventoryInfo[x].inventoryName === 'smoke pipe behind brick'){
          if(this.inventoryInfo[x].inventoryThere === true){
            //remove from inventory
            this.inventoryInfo[x].inventoryThere = false;
            //reveal music sheet
            for(let y = 0; y < this.itemsInRooms.length; y++){
              if(this.itemsInRooms[y].itemName === 'music sheet piece #1'){
                //set hidden to false
                this.itemsInRooms[y].itemHidden = false;
              }
            }
          }
        }
      }
    }
    //set to hidden
    this.hideDecision();
    //display to textArea
    document.getElementById('txtArea').innerHTML += (this.currentResult + '&#13;&#10;');
    document.getElementById('txtArea').scrollTop = document.getElementById('txtArea').scrollHeight;

    //check for brick - refactor in different function like statue fix
    if(this.nameOfItemClicked === 'loose brick'){
      //set items hidden to true
      for(let idx = 0; idx < this.itemsInRooms.length; idx++){
        //set loose brick to hidden
        if(this.itemsInRooms[idx].itemName === 'loose brick'){
          this.itemsInRooms[idx].itemHidden = true;
        }
        if(this.itemsInRooms[idx].itemName === 'smoke pipe behind brick' || this.itemsInRooms[idx].itemName === 'note behind brick'){
          this.itemsInRooms[idx].itemHidden = false;
        }
      }
    }

    //cycle thru safeInfo
    for (let i = 0; i < this.inventoryInfo.length; i++) {
      // check if item clicked exists in inventory
      if (this.inventoryInfo[i].inventoryName === this.nameOfItemClicked) {
        // make inventory item visible
        this.inventoryInfo[i].inventoryThere = true;
        this.itemsInRooms[this.idxOfItm].itemHidden = true;
      }
    }
  }

}
