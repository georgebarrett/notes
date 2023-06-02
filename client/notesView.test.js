/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const NotesModel = require('./notesModel');
const NotesView = require('./notesView');
require('jest-fetch-mock').enableMocks()

describe('NotesView', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
  });

  it ('displays a note', () => {

    const model = new NotesModel
    const view = new NotesView(model)
    const inputEl = document.querySelector('#note-input');
    inputEl.value = 'test input';
    model.addNote(inputEl.value)
    view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toBe(1);
  });
});