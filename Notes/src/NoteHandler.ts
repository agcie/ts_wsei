
import {LocalDB} from "./LocalDB";
import {DataBase} from "./DataBase";
import {FireDB} from "./FireDB";

export interface objectNote{
    note: note;
    id: string;
}
export interface note{
    title: string;
    body: string;
    date: string;
    pinned: boolean;
    tags: string[];
    color: string;
}
let colors:string[] = ["null"];
let tagTab:string[] = ["null"] ;

const db: DataBase= new FireDB();
//const db: DataBase= new LocalDB();

export class NoteHandler {

   async createNoteBlocks(){
       const notes : objectNote[] = await db.getAllNotes();

       notes.forEach(not => this.createNoteDiv(not));
        this.triggerDelListeners();
        await this.triggerTagListeners();
    }
    delNote(id: string){
        db.delNote(id);
        this.removeNoteDiv(id);
    }
   async addNote(someNote: note){
        let id = await db.addNote(someNote);
        this.createNoteDiv({note: someNote, id: id});
        this.triggerDelListeners();

        await this.triggerTagListeners();
    }
    triggerDelListeners(){
        db.getAllNotes().then(not =>{ not.forEach((element)=>{
            console.log(element.note.title);
            let elem = document.querySelector("#note"+element.id);
            elem.addEventListener("click", () => this.delNote(element.id));
        })});
    }
    async triggerTagListeners(){
        db.getAllTags().then(e=>
            e.forEach(async element => {
                console.log(element);
            let tagButton : NodeListOf<HTMLButtonElement>= document.querySelectorAll(".tag"+element);
            for (const btn of tagButton) {
                let bgColor: string  = btn.style.backgroundColor;
                const notes = await db.getAllNotesWithTag(element);
                btn.addEventListener("mousemove",
                    () =>  this.colorNoteWithTag( notes, bgColor));
                console.log("AA")
                btn.addEventListener("mouseleave",
                    () =>  this.releseColor(notes ));
            }
            }));
    }
    releseColor(notes: objectNote[]){
        console.log("rel")
        console.log(notes)
        notes.forEach(note=> {
            let div : HTMLDivElement = document.querySelector("#id"+note.id);
            div.style.boxShadow ="";

         } )
    }
    colorNoteWithTag(notes: objectNote[], bgColor : string){
        console.log("FFFFFFFFFf")
        console.log(notes.length)
        console.log(notes)
        notes.forEach(note=> {
            console.log("ff")
            let div : HTMLDivElement = document.querySelector("#id"+note.id);

            div.style.boxShadow =" 5px 10px 18px "+bgColor;
         } )
        console.log("BBB")
    }/*
    changePinned(event : DragEvent){
        let data  = event.dataTransfer.getData("text");
    }
    dropOnPinned(event : DragEvent){
        event.preventDefault();
        const target = event.target as HTMLElement;

        let id = target.id.substr(2,3);
        const newNote = localStorage.getItem(id);
        let note = JSON.parse(newNote);
        note.pinned = true;
        localStorage.setItem(id, JSON.stringify(note));

        this.removeNoteDiv(id);

        let notpinned :HTMLDivElement = document.querySelector("#weatherBlocksPinned");
        let wrappedHTML = `<div class="weatherInfo" draggable="true"" id=id`+id+`> `+target.innerHTML+`<\div>`;
        notpinned.insertAdjacentHTML( 'beforeend',wrappedHTML);

    }

    dropOnUnPinned(event : DragEvent){
        event.preventDefault();
        const target = event.target as HTMLElement;

        let id = target.id.substr(2,3);
        const newNote = localStorage.getItem(id);
        let note = JSON.parse(newNote);
        note.pinned = false;
        localStorage.setItem(id, JSON.stringify(note));
        this.removeNoteDiv(id);

        let notpinned :HTMLDivElement = document.querySelector("#weatherBlocks");
        let wrappedHTML = `<div class="weatherInfo" draggable="true"" id=id`+id+`> `+target.innerHTML+`<\div>`;
    }
*/
    createNoteDiv(not: objectNote) {
        let place:HTMLDivElement;
        not.note.pinned ? place =  document.querySelector("#weatherBlocksPinned") :  place = document.querySelector("#weatherBlocks");
        if(not.note.color==""){
            not.note.color="#ffffff";
        }
        let WeatherDiv = document.createElement("div");
        let text= `<div class="weatherInfo" draggable="true"" id=id`+not.id+`>
        <br/><h3 style="color: #`+ not.note.color+`;" >`+not.note.title+
            ` </h3><br/> `+not.note.body+`
        <button id="note`+not.id+`" class="delbtn"> X</button><div id="tagsDiv">`;
        not.note.tags.forEach(element => {
            let color: string;
            if(tagTab.includes(element) ){
                color = colors[ tagTab.indexOf(element)];
            }
            else{
                color = Math.floor(Math.random()*16777215).toString(16);
                colors.push(color);
                tagTab.push(element);
            }
            text+=`<button class="tag`+element+` tagClass" style="background-color: #`+ color+`; " >`+element+`</button>`;
        });
        ;
        text+="</div>";
        WeatherDiv.innerHTML = text;
        place.appendChild(WeatherDiv);
        let elem = document.querySelector("#note"+not.id);
        elem.addEventListener("click", () => this.delNote(not.id));
        not.note.tags.forEach(element =>{document.querySelector(".tag"+element);})

    }
    removeNoteDiv(id: string){
        let element :HTMLElement = document.querySelector("#id"+id);
        element.parentNode.removeChild(element);
    }

}