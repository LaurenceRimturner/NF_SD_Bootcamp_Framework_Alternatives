import { Component, computed, inject, signal } from '@angular/core';
import { filterBooks } from '../../core/books';
import type { Book, NewBook, StatusFilter } from '../../core/types';
import { AppHeader } from '../app-header/app-header';
import { BookCard } from '../book-card/book-card';
import { BookFormDialog } from '../book-form-dialog/book-form-dialog';
import { BookStore } from '../book-store';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { EmptyState } from '../empty-state/empty-state';
import { Toolbar } from '../toolbar/toolbar';

@Component({
  selector: 'app-book-list-page',
  imports: [AppHeader, BookCard, BookFormDialog, ConfirmDialog, EmptyState, Toolbar],
  templateUrl: './book-list-page.html',
})
export class BookListPage {
  protected readonly store = inject(BookStore);

  protected readonly query = signal('');
  protected readonly status = signal<StatusFilter>('all');
  protected readonly visibleBooks = computed(() =>
    filterBooks(this.store.books(), { status: this.status(), query: this.query() }),
  );

  protected readonly formOpen = signal(false);
  protected readonly editing = signal<Book | null>(null);
  protected readonly deleting = signal<Book | null>(null);

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
      this.store.update(editing.id, data);
    } else {
      this.store.add(data);
    }
    this.closeForm();
  }

  protected confirmDelete(): void {
    const book = this.deleting();
    if (book) {
      this.store.remove(book.id);
    }
    this.deleting.set(null);
  }
}
