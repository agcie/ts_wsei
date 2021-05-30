

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
export class NoteHandler{

    createNoteDiv(not: objectNote) {        
        let place:HTMLDivElement;
        not.note.pinned ? place =  document.querySelector("#weatherBlocksPinned") :  place = document.querySelector("#weatherBlocks"); 
        let WeatherDiv= `<div class="weatherInfo" draggable="true"" id=id`+not.id+`>
        <br/>`+not.note.title+` <br/> `+not.note.body+`
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
                console.log(color);
            }
          WeatherDiv+=`<button class="tag`+element+` tagClass" style="background-color: #`+ color+`; " >`+element+`</button>`;
        });
        ;
        WeatherDiv+="</div>";
        place.insertAdjacentHTML( 'beforeend',WeatherDiv);

    }
    removeNoteDiv(id: string){
        let element :HTMLElement = document.querySelector("#id"+id);
        element.parentNode.removeChild(element);
    }
    
}