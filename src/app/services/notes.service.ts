import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import Note from '../models/note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  notes: Note[] = [];
  storage: Storage;
  constructor() {
    this.storage = localStorage;
    this.notes = JSON.parse(this.storage.getItem('notes') ?? '[]');
  }

  addNote(note: Note) {
    this.notes.push(note);
    this.saveNotes();
    return of(note);
  }

  saveNotes() {
    this.storage.setItem('notes', JSON.stringify(this.notes));
  }

  updateNote(note: Note) {
    this.saveNotes();
  }

  deleteNote(note: Note) {
    if (this.notes.indexOf(note) > -1) {
      this.notes.splice(this.notes.indexOf(note), 1);
      this.saveNotes();
      return of(true);
    }
    return of(false);
  }

  getAllNotes() {
    return of<Note[]>(this.notes);
  }
}
