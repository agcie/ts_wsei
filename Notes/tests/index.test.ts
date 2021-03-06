//import {LocalDB} from "../src/LocalDB";


// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
/**
 * @jest-environment jsdom
 */


import * as puppeteer from 'puppeteer';

import {NoteHandler} from "../src/NoteHandler";

describe( 'Adding notes', () =>{
        it('Add one pinned note', ()=>{
        const element = document.createElement('div');
        element.id = "weatherBlocksPinned";
        const element2 = document.createElement('div');
        element2.id = "weatherBlocks";
        document.body.appendChild(element);
        document.body.appendChild(element2);


        const n = new NoteHandler();
        let someNote  = {id:"1" , note: {title :"Title", body: "body", date:"date", pinned: true, tags:["abc", "def"], color:"black"}};
        n.createNoteDiv(someNote);
        expect(document.querySelector("#weatherBlocksPinned").children.length).toBe(1);
        expect(document.querySelector("#weatherBlocks").children.length).toBe(0);

})
})

describe( 'Deleting notes', () =>{
it('Delete note', ()=>{
        const element2 = document.createElement('div');
        element2.id = "weatherBlocks";

        const noteDiv = document.createElement('div');
        noteDiv.id = "id1"
        element2.appendChild(noteDiv);
        document.body.appendChild(element2);

        const n = new NoteHandler();
        n.delNote("1");
        expect(document.querySelector("#weatherBlocks").children.length).toBe(0);
})
})


describe('Puppeter', () => {

  it('trying"', async () => {
          const browser = await puppeteer.launch({ headless: false, slowMo: 30 })
          const page = await browser.newPage();

          await page.goto('https://agcie.github.io/Notes/index.html');
          await expect(page.title()).resolves.toMatch('Notes');

          await page.type('#title', 'Title');
          await page.type('#body', 'body');
          await page.type('#tags', 'tag1, tag2');

          const pinned = await page.$("#pinned");
          await pinned.click();

          const green = await page.$(".green");
          await green.click();

          await page.keyboard.press('Enter');

  });
});