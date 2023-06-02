const Notes = require('./notesModel');

describe('NotesModel', () => {
  it('constructs with an empty array', () => {
    notes = new Notes
    expect(notes.getNotes()).toEqual([])
  });

  it('should add notes to the model', () => {
    notes = new Notes
    notes.addNote('Make a cup of tea');
    notes.addNote('Make another cup of tea');
    expect(notes.getNotes()).toEqual(['Make a cup of tea', 'Make another cup of tea'])
  });

});