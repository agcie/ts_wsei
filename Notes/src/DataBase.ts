import { note, objectNote } from "./NoteHandler";

export interface DataBase{
    getNote(id: string): Promise<note>;
    getAllNotes(): Promise<objectNote[]>;
    getAllTags(): Promise<string[]>;
    getAllNotesWithTag(tag: string): Promise<objectNote[]>;
    delNote(id: string): void;
    addNote(someNote: note) : Promise<string>;
};