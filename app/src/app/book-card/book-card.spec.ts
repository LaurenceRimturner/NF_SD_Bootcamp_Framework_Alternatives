import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, expect, it } from 'vitest';
import type { Book } from '../../core/types';
import { BookCard } from './book-card';

const book: Book = {
  id: 'x',
  title: 'Dune',
  author: 'Frank Herbert',
  status: 'done',
  rating: 4,
  notes: '',
};

function render(value: Book): { element: HTMLElement; edits: Book[]; removes: Book[] } {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(BookCard);
  fixture.componentRef.setInput('book', value);
  const edits: Book[] = [];
  const removes: Book[] = [];
  fixture.componentInstance.edit.subscribe((b) => edits.push(b));
  fixture.componentInstance.remove.subscribe((b) => removes.push(b));
  fixture.detectChanges();
  return { element: fixture.nativeElement as HTMLElement, edits, removes };
}

describe('BookCard', () => {
  it('shows title, author, status label and rating', () => {
    const { element } = render(book);
    expect(element.querySelector('h2')?.textContent?.trim()).toBe('Dune');
    expect(element.querySelector('h2 a')?.getAttribute('href')).toBe('/books/x');
    expect(element.textContent).toContain('Frank Herbert');
    expect(element.textContent).toContain('Done');
    expect(element.querySelector('[role="img"]')?.getAttribute('aria-label')).toBe('Rated 4 out of 5');
  });

  it('shows "Not rated" and no rating image without rating', () => {
    const { element } = render({ ...book, rating: null });
    expect(element.textContent).toContain('Not rated');
    expect(element.querySelector('[role="img"]')).toBeNull();
  });

  it('emits edit and remove with the book', () => {
    const { element, edits, removes } = render(book);
    const [edit, remove] = Array.from(element.querySelectorAll('button'));
    edit.click();
    remove.click();
    expect(edits).toEqual([book]);
    expect(removes).toEqual([book]);
  });
});
