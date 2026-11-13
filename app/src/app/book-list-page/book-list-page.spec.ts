import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import seed from '../../core/seed.json';
import { BookStore } from '../book-store';
import { BookListPage } from './book-list-page';

function setup(): { fixture: ReturnType<typeof TestBed.createComponent<BookListPage>>; root: HTMLElement } {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(BookListPage);
  fixture.detectChanges();
  return { fixture, root: fixture.nativeElement as HTMLElement };
}

function type(root: HTMLElement, text: string): void {
  const input = root.querySelector<HTMLInputElement>('input[type="search"]');
  if (!input) throw new Error('search input missing');
  input.value = text;
  input.dispatchEvent(new Event('input'));
}

describe('BookListPage', () => {
  beforeEach(() => {
    localStorage.clear();
    // jsdom has no modal dialog support.
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  it('shows all seed books on the first visit', () => {
    const { root } = setup();
    expect(root.querySelectorAll('app-book-card')).toHaveLength(seed.length);
  });

  it('combines the status filter and the search', () => {
    const { fixture, root } = setup();
    const done = Array.from(root.querySelectorAll('button')).find((b) => b.textContent?.trim() === 'Done');
    done?.click();
    type(root, 'dune');
    fixture.detectChanges();
    expect(root.querySelectorAll('app-book-card')).toHaveLength(1);
  });

  it('shows the empty state when nothing matches', () => {
    const { fixture, root } = setup();
    type(root, 'zzzz-no-match');
    fixture.detectChanges();
    expect(root.querySelector('app-empty-state')).not.toBeNull();
    expect(root.querySelectorAll('app-book-card')).toHaveLength(0);
  });

  it('does not save a new book without title and author, then saves a valid one', () => {
    const { fixture, root } = setup();
    root.querySelector<HTMLButtonElement>('app-header button')?.click();
    fixture.detectChanges();
    const form = root.querySelector('form');
    form?.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(root.querySelector('#title-error')?.textContent).toContain('required');
    expect(root.querySelector('#author-error')?.textContent).toContain('required');
    expect(root.querySelectorAll('app-book-card')).toHaveLength(seed.length);

    const fill = (id: string, value: string): void => {
      const el = root.querySelector<HTMLInputElement>(id);
      if (!el) throw new Error(`${id} missing`);
      el.value = value;
      el.dispatchEvent(new Event('input'));
    };
    fill('#book-title', 'New Book');
    fill('#book-author', 'Someone');
    form?.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(root.querySelectorAll('app-book-card')).toHaveLength(seed.length + 1);
    expect(TestBed.inject(BookStore).toast()).toBe('Book added');
    expect(JSON.parse(localStorage.getItem('reading-list:books') ?? '[]')).toHaveLength(seed.length + 1);
  });
});
