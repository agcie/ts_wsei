import { note, objectNote, NoteHandler } from "./NoteHandler";


const noteHandler: NoteHandler= new NoteHandler();

export class AppStorage{
    private idListName = "IDArray";
    noteTab : note[];

    public constructor(){
    if(localStorage.getItem(this.idListName) == null || undefined  || "")
    {
        localStorage.setItem(this.idListName, "0");
    }
    }

    createNoteBlocks(){
        this.getAllNotes().forEach((not)=>{
            noteHandler.createNoteDiv(not);
        })
        this.triggerDelListeners();
        this.triggerTagListeners();
    }
    getNextId(): string{
        let listOfIds: string[] = [];
        listOfIds=  localStorage.getItem(this.idListName).split(":");
        const id = Number(listOfIds[listOfIds.length-1])+1;
        return id.toString();
    }
    pushIdToList(id: string){
        let listOfIds=  localStorage.getItem(this.idListName).split(":");
        listOfIds.push(id);
        localStorage.setItem(this.idListName, listOfIds.join(":"));
    }

    getNote(id: string): note{
        const newNote = localStorage.getItem(id);
        return JSON.parse(newNote);
    }

    addNote(someNote: note): void{
        localStorage.setItem(this.getNextId(), JSON.stringify(someNote));
        let ob : objectNote = {note:someNote, id:this.getNextId() };
        this.pushIdToList(this.getNextId());
        noteHandler.createNoteDiv(ob);
        this.triggerDelListeners();
        this.triggerTagListeners();
    }
    triggerDelListeners(){
        this.getAllNotes().forEach(element => {
            document.querySelector("#note"+element.id).addEventListener("click", () => this.delNote(element.id));
        }); 
    }
    triggerTagListeners(){

        this.getAllTags().forEach(element => {
            console.log(element);
            let tagButton : NodeListOf<HTMLButtonElement>= document.querySelectorAll(".tag"+element);
            tagButton.forEach(btn => 
                {
                    let bgColor: string  = btn.style.backgroundColor;
                    btn.addEventListener("mousemove", () =>  this.colorNoteWithTag(this.getAllNotesWithTag(element), bgColor))
                    btn.addEventListener("mouseleave", () =>  this.releseColor(this.getAllNotesWithTag(element)))
                }
                );
        }); 
    }
    releseColor(notes: objectNote[]){
        notes.forEach(note=> {

            let div : HTMLDivElement = document.querySelector("#id"+note.id);
            div.style.boxShadow ="";

         } )
    }
    colorNoteWithTag(notes: objectNote[], bgColor : string){
        notes.forEach(note=> {

            let div : HTMLDivElement = document.querySelector("#id"+note.id);
            div.style.boxShadow =" 5px 10px 18px "+bgColor;

         } )
    }
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

        noteHandler.removeNoteDiv(id);

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

        noteHandler.removeNoteDiv(id);

        let notpinned :HTMLDivElement = document.querySelector("#weatherBlocks");
        let wrappedHTML = `<div class="weatherInfo" draggable="true"" id=id`+id+`> `+target.innerHTML+`<\div>`;

    }

    delNote(id: string){
        this.removeId(Number(id));
        localStorage.removeItem(id);
        noteHandler.removeNoteDiv(id);
    }
    removeId(id: number) {
        let listOfIds=  localStorage.getItem(this.idListName).split(":");
        let idx = listOfIds.indexOf(id.toString());
        let firstHalf = listOfIds.slice(0, idx);
        let secondHalf= listOfIds.slice( idx +1);
        let newArr = firstHalf.concat(secondHalf);
        localStorage.setItem(this.idListName, newArr.join(":"));
        
    }
    getAllNotes(): objectNote[]{
        let listOfIds=  localStorage.getItem(this.idListName).split(":");
        let notTab: objectNote[] = [];
        for(let i of listOfIds){
            if(i!="0"){
                notTab.push({note: this.getNote(i.toString()), id: i})
            }
        }
        return notTab;
    }
    getAllTags(): string[]{
        let listOfIds=  localStorage.getItem(this.idListName).split(":");
        let tagTab: string[] = [];
        for(let i of listOfIds){
            if(i!="0"){
                this.getNote(i.toString()).tags.forEach(element => {
                  if(!tagTab.includes(element)) {
                      tagTab.push(element);
                  }
                });
            }
        }
        return tagTab;
    }
    getAllNotesWithTag(tag: string): objectNote[]{
        let listOfIds=  localStorage.getItem(this.idListName).split(":");
        let notTab: objectNote[] = [];
        this.getAllNotes().forEach(element => {
            if(element.note.tags.includes(tag)){
                notTab.push(element);
            }
        });
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        console.log(notTab);
        return notTab;
    }

}