
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

//const db: DataBase= new FireDB();
const db: DataBase= new LocalDB();

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
    }


    createNoteDiv(not: objectNote) {
        let place:HTMLDivElement;
        not.note.pinned ? place =  document.querySelector("#weatherBlocksPinned") :  place = document.querySelector("#weatherBlocks");
        if(not.note.color==""){
            not.note.color="#ffffff";
        }
        let WeatherDiv = document.createElement("div");
        WeatherDiv.className = "weatherInfo";
        WeatherDiv.id="id"+not.id;
        WeatherDiv.draggable = true;

        let title = document.createElement("h3");
        title.style.color = "#"+not.note.color;
        title.innerHTML = not.note.title;
        let body = document.createElement("div");
        body.innerHTML = not.note.body

        let delButton = document.createElement("button");
        delButton.id = "note"+not.id;
        delButton.className = "delbtn";
        delButton.innerHTML = "X";

        let tagsDiv = document.createElement("div");
        tagsDiv.id ="tagsDiv";

        not.note.tags.forEach(element => {
            let color: string;
            if(tagTab.includes(element) ){
                color = colors[tagTab.indexOf(element)];
            }
            else{
                color = Math.floor(Math.random()*16777215).toString(16);
                colors.push(color);
                tagTab.push(element);
            }
            let tagButton = document.createElement("button");
            tagButton.style.backgroundColor = "#"+color;
            tagButton.className = "tag"+element+ " tagClass";
            tagButton.innerHTML = element;
            tagsDiv.appendChild(tagButton);
        });


        WeatherDiv.appendChild(title);
        WeatherDiv.appendChild(body);
        WeatherDiv.appendChild(delButton);
        WeatherDiv.appendChild(tagsDiv);
        place.appendChild(WeatherDiv);
        let elem = document.querySelector("#note"+not.id);
        elem.addEventListener("click", () => this.delNote(not.id));
        not.note.tags.forEach(element =>{document.querySelector(".tag"+element);})

    }
    removeNoteDiv(id: string){
        let element :HTMLElement = document.querySelector("#id"+id);
        element.parentNode.removeChild(element);
    }

    async dropOnPinned(event : DragEvent){
        console.log("DROP PINNED")
        event.preventDefault();
        const target = event.target as HTMLElement;

        //get dragged note
        let id = target.id.substr(2);
        const newNote : note = await db.getNote(id)

        //set property pinned to true
        newNote.pinned = true;

        //add note with changed property to db and delete old one
        const nh = new NoteHandler()
        await nh.addNote(newNote);
        await nh.delNote(id);

    }

    async  dropOnUnPinned(event : DragEvent){
        event.preventDefault();
        const target = event.target as HTMLElement;

        //get dragged note
        let id = target.id.substr(2);
        const newNote : note = await db.getNote(id)

        //set property pinned to false
        newNote.pinned = false;

        //add note with changed property to db
        const nh = new NoteHandler()
        await nh.addNote(newNote);
        await nh.delNote(id);
    }
}