

import {AppStorage} from './AppStorage'
import {note, objectNote} from './NoteHandler'

const  storageHandler: AppStorage = new AppStorage();

export class App{

    public constructor(){
        document.addEventListener('keypress', this.onKeyPress);
        let pinned :HTMLDivElement = document.querySelector("#weatherBlocksPinned");
        let notpinned :HTMLDivElement = document.querySelector("#weatherBlocks");
        
        pinned.addEventListener("dragend", storageHandler.dropOnUnPinned);
        notpinned.addEventListener("dragend", storageHandler.dropOnPinned);
        
        storageHandler.createNoteBlocks();
    }

    onKeyPress(ev: KeyboardEvent): void{
        if(ev.key == 'Enter'){

           let title :  HTMLInputElement= document.querySelector("#title");
           let body : HTMLInputElement= document.querySelector("#body");
           let tags : HTMLInputElement= document.querySelector("#tags");
           let noteTags: string [] = tags.value.replace(/\s/g, '').split(",");
           let pinned: HTMLInputElement= document.querySelector("#pinned");
           let isPinned : boolean = pinned.checked;
           let now  = new Date();

           let newNote :note ={title:title.value , body:body.value, date: now.toString(), tags: noteTags, pinned: isPinned, color:getColor()};

           storageHandler.addNote(newNote);
           }
        }

}

function getColor(): string{
    const colorsTab : string[]= ["red", "orange", "green", "yellow", "olive", "teal", "blue", "violet", "purple", "pink"];
    const colorsMap: string[]= ["DB2828", "F2711C", "FBBD08", "B5CC18", "21BA45", " 00B5AD", "2185D0", " 6435C9" , "A333C8", "E03997"]
    let choosenColor = "ffffff"
    colorsTab.forEach(color=> {
        console.log(color);
        let radioB :  HTMLInputElement= document.querySelector("#"+color);
            console.log(radioB.checked === true);
            if(radioB.checked === true){
               choosenColor = colorsMap[colorsTab.indexOf(color)];
            }
        }
    )
        return choosenColor;
}