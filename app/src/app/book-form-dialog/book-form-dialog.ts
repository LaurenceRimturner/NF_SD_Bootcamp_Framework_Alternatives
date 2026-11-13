import { Component, computed, input, output, signal } from '@angular/core';
import { STATUS_LABELS, STATUSES, validateBook, type BookErrors } from '../../core/books';
import type { Book, NewBook, Status } from '../../core/types';
import { Modal } from '../modal';

@Component({
  selector: 'app-book-form-dialog',
  imports: [Modal],
  templateUrl: './book-form-dialog.html',
  styleUrl: './book-form-dialog.css',
})
export class BookFormDialog {
  /** The book to edit, `null` when a new book is added. */
  readonly book = input<Book | null>(null);
  readonly save = output<NewBook>();
  readonly cancel = output<void>();

  protected readonly statuses = STATUSES.map((value) => ({ value, label: STATUS_LABELS[value] }));
  protected readonly ratings = [1, 2, 3, 4, 5];
  protected readonly heading = computed(() => (this.book() ? 'Edit book' : 'Add book'));

  protected readonly title = signal('');
  protected readonly author = signal('');
  protected readonly status = signal<Status>('want-to-read');
  protected readonly rating = signal<number | null>(null);
  protected readonly notes = signal('');
  protected readonly errors = signal<BookErrors>({});

  ngOnInit(): void {
    const book = this.book();
    if (book) {
      this.title.set(book.title);
      this.author.set(book.author);
      this.status.set(book.status);
      this.rating.set(book.rating);
      this.notes.set(book.notes);
    }
  }

  protected value(event: Event): string {
    return (event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value;
  }

  protected onStatus(event: Event): void {
    const selected = STATUSES.find((status) => status === this.value(event));
    if (selected) {
      this.status.set(selected);
    }
  }

  protected onRating(event: Event): void {
    const value = this.value(event);
    this.rating.set(value === '' ? null : Number(value));
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    const errors = validateBook({ title: this.title(), author: this.author() });
    this.errors.set(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    this.save.emit({
      title: this.title().trim(),
      author: this.author().trim(),
      status: this.status(),
      rating: this.rating(),
      notes: this.notes().trim(),
    });
  }
}
