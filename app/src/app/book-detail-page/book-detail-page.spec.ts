import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BookStore } from '../book-store';
import { BookDetailPage } from './book-detail-page';

function setup(id: string): { fixture: ReturnType<typeof TestBed.createComponent<BookDetailPage>>; root: HTMLElement } {
  TestBed.configureTestingModule({ providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(BookDetailPage);
  fixture.componentRef.setInput('id', id);
  fixture.detectChanges();
  return { fixture, root: fixture.nativeElement as HTMLElement };
}

describe('BookDetailPage', () => {
  beforeEach(() => {
    localStorage.clear();
    // jsdom has no modal dialog support.
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  it('shows the details of the book with the id of the route', () => {
    const { root } = setup('b1');
    expect(root.querySelector('h1')?.textContent).toContain('Dune');
    expect(root.textContent).toContain('Frank Herbert');
    expect(root.textContent).toContain('Done');
    expect(root.querySelector('[role="img"]')?.getAttribute('aria-label')).toBe('Rated 5 out of 5');
    expect(root.querySelector('a')?.getAttribute('href')).toBe('/');
  });

  it('shows a message for an unknown id', () => {
    const { root } = setup('does-not-exist');
    expect(root.querySelector('h1')?.textContent).toContain('Book not found');
  });

  it('deletes the book after the confirmation and goes back to the list', () => {
    const { fixture, root } = setup('b1');
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    const remove = Array.from(root.querySelectorAll('button')).find((b) => b.textContent?.trim() === 'Delete');
    remove?.click();
    fixture.detectChanges();
    const confirm = root.querySelector<HTMLButtonElement>('app-confirm-dialog .btn-danger');
    confirm?.click();
    fixture.detectChanges();
    expect(TestBed.inject(BookStore).books().some((book) => book.id === 'b1')).toBe(false);
    expect(navigate).toHaveBeenCalledWith('/');
  });
});
