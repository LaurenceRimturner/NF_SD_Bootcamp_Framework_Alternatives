import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import seed from '../core/seed.json';
import { BookStore } from './book-store';

const data = { title: 'New', author: 'Me', status: 'reading' as const, rating: null, notes: '' };

describe('BookStore', () => {
  beforeEach(() => localStorage.clear());

  it('adds, updates and removes books and sets the toast', () => {
    const store = TestBed.inject(BookStore);

    store.add(data);
    expect(store.books()).toHaveLength(seed.length + 1);
    expect(store.toast()).toBe('Book added');

    store.update('b1', { ...data, title: 'Changed' });
    expect(store.books().find((book) => book.id === 'b1')?.title).toBe('Changed');
    expect(store.toast()).toBe('Book updated');

    store.remove('b1');
    expect(store.books().some((book) => book.id === 'b1')).toBe(false);
    expect(store.toast()).toBe('Book deleted');
  });
});
