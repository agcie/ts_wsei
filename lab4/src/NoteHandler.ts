import { AppStorage, note } from './AppStorage.';

export class NoteHandler{

    private bd = new AppStorage();
    public constructor(){
        this.createNoteBlocks();
    }

    async createNoteDiv(not: note) {
        let place:HTMLDivElement =  document.querySelector("#weatherBlocks");
        let WeatherDiv= `<div class="weatherInfo"><h2>Note</h2> 
        <br/>Title{`+not.title+`}
        <br/>Body: `+not.body+`
        `;
        place.innerHTML +=WeatherDiv;
    }
    createNoteBlocks(){
        document.querySelector("#weatherBlocks").innerHTML = "";
        for(let note  of this.bd.getAllNotes()){
            this.createNoteDiv(note);
        }
    }
    refresh(){
        this.createNoteBlocks();
    }

}