class NotesView {
    constructor(model) {
      this.model = model;
  
      this.mainContainerEl = document.querySelector('#main-container');
      this.addNoteButtonEl = document.querySelector('#add-note-button');
      this.clearAllNotesButtonEl = document.querySelector('#clear-notes-button');
  
      this.addNoteButtonEl.addEventListener('click', () => {
        const noteContent = document.querySelector('#note-input').value;
        this.addNewNote(noteContent)
        this.displayNotes();
      });
    }
  
    displayNotes() {
      const errorEl = document.querySelector('.error');
      if (errorEl !== null) {
        errorEl.remove();
      }
      document.querySelectorAll('.note')
      .forEach((note) => note.remove());
  
      const notes = this.model.getNotes();
      notes.forEach(note => {
        let noteEl = document.createElement('div');
        noteEl.className = 'note';
        noteEl.textContent = note;
        this.mainContainerEl.append(noteEl);
      });
      document.getElementById('note-input').value = "";
    }
  
    addNewNote(noteContent) {
      this.model.addNote(noteContent);
    }
  
}   
  
module.exports = NotesView;