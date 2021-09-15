import { note, objectNote } from "./NoteHandler";
import {DataBase} from "./DataBase";

export class LocalDB implements DataBase{
    private idListName = "IDArray";

    public constructor(){
        if(localStorage.getItem(this.idListName) == null || undefined  || "")
        {
            localStorage.setItem(this.idListName, "0");
        }
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

    getNote(id: string): Promise<note>{
        const newNote = localStorage.getItem(id);
        return JSON.parse(newNote);
    }
    async getAllNotes(): Promise<objectNote[]>{
        let listOfIds=  localStorage.getItem(this.idListName).split(":");
        let notTab: objectNote[] = [];
        for(let i of listOfIds){
            if(i!="0"){
                notTab.push({note: await this.getNote(i.toString()), id: i})
            }
        }
        return notTab;
    }
    async getAllTags(): Promise<string[]>{
        let listOfIds=  localStorage.getItem(this.idListName).split(":");
        let tagTab: string[] = [];
        for(let i of listOfIds){
            if(i!="0") {
                const notes = await this.getNote(i.toString());
                notes.tags.forEach(element => {
                        if (!tagTab.includes(element)) {
                            tagTab.push(element);
                        }
                    });
            }
        }
        return tagTab;
    }
   async getAllNotesWithTag(tag: string): Promise<objectNote[]>{
        let listOfIds=  localStorage.getItem(this.idListName).split(":");
        let notTab: objectNote[] = [];
        this.getAllNotes().then(n => n.forEach(element => {
            if(element.note.tags.includes(tag)){
                notTab.push(element);
            }
        }));
        return notTab;
    }

    removeId(id: number) {
        let listOfIds=  localStorage.getItem(this.idListName).split(":");
        if(listOfIds.includes(id.toString())){
            let idx = listOfIds.indexOf(id.toString());
            let firstHalf = listOfIds.slice(0, idx);
            let secondHalf= listOfIds.slice( idx +1);
            let newArr = firstHalf.concat(secondHalf);
            localStorage.setItem(this.idListName, newArr.join(":"));
        }
    }
    delNote(id: string){
        this.removeId(Number(id));
        localStorage.removeItem(id);
    }
    async addNote(someNote: note) : Promise<string>{
        localStorage.setItem(this.getNextId(), JSON.stringify(someNote));
        let ob : objectNote = {note:someNote, id:this.getNextId() };
        this.pushIdToList(this.getNextId());
        return (Number(this.getNextId()) -1).toString();
    }
}