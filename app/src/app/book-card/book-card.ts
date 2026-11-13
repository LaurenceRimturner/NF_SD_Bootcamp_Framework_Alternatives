import { Component, computed, input, output } from '@angular/core';
import { STATUS_LABELS } from '../../core/books';
import type { Book } from '../../core/types';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard {
  readonly book = input.required<Book>();
  readonly edit = output<Book>();
  readonly remove = output<Book>();

  protected readonly statusLabel = computed(() => STATUS_LABELS[this.book().status]);
  protected readonly stars = computed(() => {
    const rating = this.book().rating;
    return rating === null ? '' : '★'.repeat(rating) + '☆'.repeat(5 - rating);
  });
  protected readonly ratingLabel = computed(() => {
    const rating = this.book().rating;
    return rating === null ? 'Not rated' : `Rated ${rating} out of 5`;
  });
}
