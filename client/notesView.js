class NotesView {
    constructor(model, client) {
      this.model = model;
      this.client = client;

      this.mainContainerEl = document.querySelector('#main-container');
      this.addNoteButtonEl = document.querySelector('#add-note-button');
      this.clearAllNotesButtonEl = document.querySelector('#clear-notes-button');
  
      this.addNoteButtonEl.addEventListener('click', () => {
        const noteContent = document.querySelector('#note-input').value;
        this.addNoteToAPI(noteContent)
        this.addNewNote(noteContent)
        this.displayNotes();
      });

      this.clearAllNotesButtonEl.addEventListener('click', () => {
        this.clearNotes();
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

    displayNotesFromApi() {
        this.client.loadNotes((apiData) => {
          this.model.setNotes(apiData);
          this.displayNotes();
        })
    }

    clearNotes() {
        document.querySelectorAll('.note').forEach(element => {
          element.remove();
        });
        this.displayNotesFromApi();
    }

    addNoteToAPI(noteContent) {
        this.client.createNote(noteContent);
    }
}   
  
module.exports = NotesView;