import { effect, Injectable, signal } from '@angular/core';
import { addBook, deleteBook, updateBook } from '../core/books';
import { loadBooks, saveBooks } from '../core/storage';
import type { Book, NewBook } from '../core/types';

const TOAST_MS = 3000;

/** The books and the toast message, shared by all pages. */
@Injectable({ providedIn: 'root' })
export class BookStore {
  readonly books = signal<Book[]>(loadBooks());
  readonly toast = signal('');
  private toastTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    effect(() => saveBooks(this.books()));
  }

  add(data: NewBook): void {
    this.books.update((books) => addBook(books, data));
    this.showToast('Book added');
  }

  update(id: string, data: NewBook): void {
    this.books.update((books) => updateBook(books, id, data));
    this.showToast('Book updated');
  }

  remove(id: string): void {
    this.books.update((books) => deleteBook(books, id));
    this.showToast('Book deleted');
  }

  private showToast(message: string): void {
    clearTimeout(this.toastTimer);
    this.toast.set(message);
    this.toastTimer = setTimeout(() => this.toast.set(''), TOAST_MS);
  }
}
