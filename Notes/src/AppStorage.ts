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
    private idListName = "IDArray";
    noteTab : note[];
    public constructor(){
    if(localStorage.getItem(this.idListName) == null || undefined  || ""){
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
    removeId(id: number) {
        let listOfIds=  localStorage.getItem(this.idListName).split(":");
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && listOfIds.length) {
            what = a[--L];
            while ((ax=  listOfIds.indexOf(what)) !== -1) {
                listOfIds.splice(ax, 1);
            }
        }
        localStorage.setItem(this.idListName, listOfIds.join(":"));
    }
    getNote(id: string): note{

        const newNote = localStorage.getItem(id);
        console.log(newNote);
        return JSON.parse(newNote);
    }

    addNote(someNote: note): void{

        localStorage.setItem(this.getNextId(), JSON.stringify(someNote));
        this.pushIdToList(this.getNextId());
    }

    delNote(id: string){
        this.removeId(Number(id));
        localStorage.removeItem(id);   
    }

    getAllNotes(): note[]{
        let listOfIds=  localStorage.getItem(this.idListName).split(":");
        let notTab: note[] = [];
        for(let i of listOfIds){
            if(i!="0"){
                notTab.push(this.getNote(i.toString()))
            }

        }
        console.log(notTab);
        return notTab;
    }
}