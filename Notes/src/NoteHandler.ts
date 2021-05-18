import { AppStorage, note } from './AppStorage';

export class NoteHandler{

    private bd = new AppStorage();
    public constructor(){
        this.createNoteBlocks();
    }

    createNoteDiv(not: note) {
        let place:HTMLDivElement =  document.querySelector("#weatherBlocks");
        let WeatherDiv= `<div class="weatherInfo"><h2>Note</h2> 
        <br/>Title`+not.title+`
        <br/>Body: `+not.body+`
        `;
        place.innerHTML +=WeatherDiv;
    }
    createNoteBlocks(){
        document.querySelector("#weatherBlocks").innerHTML = "";
        const noteList : note[] = this.bd.getAllNotes();
        for(let not of noteList){
            console.log("iN createNote Blocks:"+ not)
            this.createNoteDiv(not);
        }
    }
    refresh(){
        this.createNoteBlocks();
    }

}