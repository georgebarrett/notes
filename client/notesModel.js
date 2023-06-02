class Notes {
    constructor() {
      this.notes = [];
    }
  
    getNotes() {
        return this.notes;
    }
  
    addNote(note) {
        this.notes.push(note);
    }
  
    setNotes(notes) {
    }
  
    reset() {
    }
  }
  
  module.exports = Notes;