

import {AppStorage} from './AppStorage'
import {note, objectNote} from './NoteHandler'

//const noteHandler: NoteHandler= new NoteHandler();
const  storageHandler: AppStorage = new AppStorage();

export class App{

    public constructor(){
        document.addEventListener('keypress', this.onKeyPress);
        let pinned :HTMLDivElement = document.querySelector("#weatherBlocksPinned");
        let notpinned :HTMLDivElement = document.querySelector("#weatherBlocks");

        // pinned.addEventListener("dragover", storageHandler.changePinned);
        // notpinned.addEventListener("dragover", storageHandler.changePinned);
        
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

           let newNote :note ={title:title.value , body:body.value, date: now.toString(), tags: noteTags, pinned: isPinned, color:""};

           storageHandler.addNote(newNote);
           }
        }
    }