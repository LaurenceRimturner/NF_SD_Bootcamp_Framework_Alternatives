import { Component, computed, effect, signal } from '@angular/core';
import { addBook, deleteBook, filterBooks, updateBook } from '../core/books';
import { loadBooks, saveBooks } from '../core/storage';
import type { Book, NewBook, StatusFilter } from '../core/types';
import { BookCard } from './book-card/book-card';
import { BookFormDialog } from './book-form-dialog/book-form-dialog';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog';
import { EmptyState } from './empty-state/empty-state';
import { Toast } from './toast/toast';
import { Toolbar } from './toolbar/toolbar';

const TOAST_MS = 3000;

@Component({
  selector: 'app-root',
  imports: [BookCard, BookFormDialog, ConfirmDialog, EmptyState, Toast, Toolbar],
  templateUrl: './app.html',
})
export class App {
  protected readonly books = signal<Book[]>(loadBooks());
  protected readonly query = signal('');
  protected readonly status = signal<StatusFilter>('all');
  protected readonly visibleBooks = computed(() =>
    filterBooks(this.books(), { status: this.status(), query: this.query() }),
  );

  protected readonly formOpen = signal(false);
  protected readonly editing = signal<Book | null>(null);
  protected readonly deleting = signal<Book | null>(null);
  protected readonly toast = signal('');
  private toastTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    effect(() => saveBooks(this.books()));
  }

  protected openAdd(): void {
    this.editing.set(null);
    this.formOpen.set(true);
  }

  protected openEdit(book: Book): void {
    this.editing.set(book);
    this.formOpen.set(true);
  }

  protected closeForm(): void {
    this.formOpen.set(false);
  }

  protected saveBook(data: NewBook): void {
    const editing = this.editing();
    if (editing) {
      this.books.update((books) => updateBook(books, editing.id, data));
      this.showToast('Book updated');
    } else {
      this.books.update((books) => addBook(books, data));
      this.showToast('Book added');
    }
    this.closeForm();
  }

  protected confirmDelete(): void {
    const book = this.deleting();
    if (book) {
      this.books.update((books) => deleteBook(books, book.id));
      this.showToast('Book deleted');
    }
    this.deleting.set(null);
  }

  private showToast(message: string): void {
    clearTimeout(this.toastTimer);
    this.toast.set(message);
    this.toastTimer = setTimeout(() => this.toast.set(''), TOAST_MS);
  }
}
