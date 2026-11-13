import { Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { STATUS_LABELS } from '../../core/books';
import type { NewBook } from '../../core/types';
import { AppHeader } from '../app-header/app-header';
import { BookFormDialog } from '../book-form-dialog/book-form-dialog';
import { BookStore } from '../book-store';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-book-detail-page',
  imports: [AppHeader, BookFormDialog, ConfirmDialog, RouterLink],
  templateUrl: './book-detail-page.html',
})
export class BookDetailPage {
  /** The ":id" of the route, bound by the router. */
  readonly id = input.required<string>();

  private readonly store = inject(BookStore);
  private readonly router = inject(Router);

  protected readonly book = computed(() => this.store.books().find((book) => book.id === this.id()));
  protected readonly statusLabel = computed(() => {
    const book = this.book();
    return book ? STATUS_LABELS[book.status] : '';
  });
  protected readonly stars = computed(() => {
    const rating = this.book()?.rating ?? null;
    return rating === null ? '' : '★'.repeat(rating) + '☆'.repeat(5 - rating);
  });

  protected readonly formOpen = signal(false);
  protected readonly confirmOpen = signal(false);

  protected saveBook(data: NewBook): void {
    this.store.update(this.id(), data);
    this.formOpen.set(false);
  }

  protected confirmDelete(): void {
    this.store.remove(this.id());
    this.confirmOpen.set(false);
    void this.router.navigateByUrl('/');
  }
}
