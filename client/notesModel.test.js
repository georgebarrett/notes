const Notes = require('./notesModel');

describe('NotesModel', () => {
  it('constructs with an empty array', () => {
    notes = new Notes
    expect(notes.getNotes()).toEqual([])
  });
});