document.addEventListener('DOMContentLoaded', (event) => {
    const notesList = document.getElementById('notes-list');
    const noteInput = document.getElementById('note-input');
    const addNoteButton = document.getElementById('add-note-button');
    const noNotesMessage = document.getElementById('no-notes-message');

    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        if (notes.length === 0) {
            noNotesMessage.style.display = 'block';
        } else {
            noNotesMessage.style.display = 'none';
        }
        notes.forEach(note => {
            createNoteElement(note);
        });
    }

    function saveNotes(notes) {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function createNoteElement(note) {
        const li = document.createElement('li');
        li.className = 'note-item';
        li.textContent = note;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteNoteElement(li, note);
        });

        li.appendChild(deleteButton);
        notesList.appendChild(li);
    }

    function addNote() {
        const note = noteInput.value.trim();
        if (note === '') {
            return;
        }
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        saveNotes(notes);
        createNoteElement(note);
        noteInput.value = '';
        noNotesMessage.style.display = 'none';
    }

    function deleteNoteElement(noteElement, note) {
        notesList.removeChild(noteElement);
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const updatedNotes = notes.filter(n => n !== note);
        saveNotes(updatedNotes);
        if (updatedNotes.length === 0) {
            noNotesMessage.style.display = 'block';
        }
    }

    addNoteButton.addEventListener('click', addNote);

    noteInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addNote();
        }
    });

    loadNotes();
});
