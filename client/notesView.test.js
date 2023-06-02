/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const NotesModel = require('./notesModel');
const NotesView = require('./notesView');
const NotesClient = require('./notesClient');
require('jest-fetch-mock').enableMocks();

jest.mock('./notesClient');

describe('NotesView', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    NotesClient.mockClear();
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

  it ('clears the list of previous note before displaying', () => {

    const model = new NotesModel
    const view = new NotesView(model)
    const inputEl = document.querySelector('#note-input');
    inputEl.value = 'test input';
    model.addNote(inputEl.value)
    inputEl.value = 'test two input';
    model.addNote(inputEl.value)

    view.displayNotes();
    //view.displayNotes();

    expect(document.querySelectorAll('div.note').length).toEqual(2);
  });

  it ('clears the input value after adding a note', () => {

    const model = new NotesModel
    const view = new NotesView(model)
    const inputEl = document.querySelector('#note-input');
    inputEl.value = 'test input';
    view.displayNotes();

    expect(document.getElementById('note-input').value).toBe("")
  });

  it('displays the note from the API', () => {
    const model = new NotesModel();
    const client = new NotesClient();
    const notes = new NotesView(model, client);

    client.loadNotes.mockImplementation((callback) => {
      callback(['note 1'])
    });
    
    notes.displayNotesFromApi()
    expect(document.querySelectorAll('div.note').length).toEqual(1)
  });

  it ('clears my notes with the Clear Notes button', () => {

    const model = new NotesModel
    const client = new NotesClient
    const view = new NotesView(model, client)
    const inputEl = document.querySelector('#note-input');
    inputEl.value = 'test input';

    client.loadNotes.mockImplementation((callback) => {
      callback(['note 1'])
    });
    
    view.displayNotes();
    view.clearNotes();
    
    expect(document.querySelectorAll('div.note').length).toEqual(1);
  });
});