

import {AppStorage, note} from './AppStorage'
import {NoteHandler} from './NoteHandler'
export class App{
    private storageHandler: AppStorage;
    private noteHandler: NoteHandler;

    public constructor(){
        document.addEventListener('keypress', this.onKeyPress);
        this.noteHandler= new NoteHandler();
        console.log("creareNoteBlocks");
        this.noteHandler.createNoteBlocks();
    }

    onKeyPress(ev: KeyboardEvent): void{
        if(ev.key == 'Enter'){
           let title :  HTMLInputElement= document.querySelector("#title");
           let body : HTMLInputElement= document.querySelector("#body");
           let newNote :note ={title:title.value , body:body.value, date: ""}
           this.storageHandler= new AppStorage();
           this.noteHandler= new NoteHandler();
           this.storageHandler.addNote(newNote);
           this.noteHandler.refresh();
           }
        }
    }