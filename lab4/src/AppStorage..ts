interface objectNote{
    note: note;
    id: number;
}
export interface note{
    title: string;
    body: string;
    date: string;
}
export class AppStorage{

    listOfIds: number[];
    noteTab : note[];
    public constructor(){
        this.listOfIds.push(0);
    }

    getNextId(): string{
        const id = this.listOfIds[this.listOfIds.length-1]+1;
        this.listOfIds.push(id);
        return id.toString();
    }
    
    removeId(id: number) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && this.listOfIds.length) {
            what = a[--L];
            while ((ax=  this.listOfIds.indexOf(what)) !== -1) {
                this.listOfIds.splice(ax, 1);
            }
        }
    }
    getNote(id: string): note{
        const newNote = localStorage.getItem(id);
        return JSON.parse(newNote);
    }

    addNote(someNote: note): void{
        localStorage.setItem(this.getNextId(), JSON.stringify(someNote));   
    }

    delNote(id: string){
        this.removeId(Number(id));
        localStorage.removeItem(id);   
    }

    getAllNotes(): note[]{
        let notTab: note[] = [];
        for(let i of this.listOfIds){
            notTab.push(this.getNote(i.toString()))
        }
        return notTab;
    }
}