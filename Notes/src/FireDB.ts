import {DataBase} from "./DataBase";
import {initializeApp} from 'firebase/app';

import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

import { firebaseConfig } from './config';
import {note, objectNote} from "./NoteHandler";

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export class FireDB implements DataBase{

     async getAllNotes(): Promise<objectNote[]>{
        const notesSnapshop = await getDocs(collection(db, 'notes'));
        const notesList :objectNote[] = notesSnapshop.docs.map(doc => ({note: doc.data() , id: doc.id}) as objectNote);
        return notesList;
    }

    async getNote(id: string): Promise<note>{
         const notes: objectNote[] =  await this.getAllNotes();
       return notes.find(el => el.id == id).note;
    }

    async getAllTags():  Promise<string[]>{
        let tagTab: string[] = [];
        const notes: objectNote[] =  await this.getAllNotes();
        notes.forEach(note=> note.note.tags.forEach(tag=>{
            if (!tagTab.includes(tag)) {
                tagTab.push(tag);
        }} ))
        return tagTab;
    }

    async getAllNotesWithTag(tag: string):Promise<objectNote[]>{
        let notTab: objectNote[] = [];
        const notes: objectNote[] =  await this.getAllNotes();
        notes.forEach(element => {
            if(element.note.tags.includes(tag)){
                notTab.push(element);
            }
        });
        return notTab;
    }
    async delNote(id: string){
        await deleteDoc(doc(db, "notes", id));
    }
    async addNote(someNote: note) : Promise<string>{
        try {
            const docRef = await addDoc(collection(db, "notes"), someNote);
            return  docRef.id;
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}